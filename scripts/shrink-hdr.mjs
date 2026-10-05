// Bir martalik skript: Radiance .hdr faylni 2x kichraytiradi (box filter) va RLE bilan qayta yozadi.
// Ishlatish: node scripts/shrink-hdr.mjs <kirish.hdr> <chiqish.hdr>
import { readFileSync, writeFileSync } from 'node:fs';

const [, , input, output] = process.argv;
const buf = readFileSync(input);

// --- Header ---
let pos = 0;
const readLine = () => {
  const start = pos;
  while (buf[pos] !== 0x0a) pos++;
  return buf.toString('latin1', start, pos++);
};
while (readLine() !== '') {}
const res = readLine().match(/-Y (\d+) \+X (\d+)/);
const H = +res[1];
const W = +res[2];

// --- Decode (yangi uslubdagi RLE) ---
const rgbe = new Uint8Array(W * H * 4);
const scan = new Uint8Array(W * 4);
for (let y = 0; y < H; y++) {
  if (buf[pos] !== 2 || buf[pos + 1] !== 2) throw new Error('Faqat RLE formati qo‘llab-quvvatlanadi');
  pos += 4;
  for (let c = 0; c < 4; c++) {
    let x = 0;
    while (x < W) {
      let count = buf[pos++];
      if (count > 128) {
        count -= 128;
        const v = buf[pos++];
        while (count--) scan[(x++) * 4 + c] = v;
      } else {
        while (count--) scan[(x++) * 4 + c] = buf[pos++];
      }
    }
  }
  rgbe.set(scan, y * W * 4);
}

// --- Float'ga o'tkazib, 2x2 o'rtacha ---
const toF = (i) => {
  const e = rgbe[i + 3];
  if (!e) return [0, 0, 0];
  const f = Math.pow(2, e - 136);
  return [rgbe[i] * f, rgbe[i + 1] * f, rgbe[i + 2] * f];
};
const w = W / 2;
const h = H / 2;
const out = new Uint8Array(w * h * 4);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const s = [0, 0, 0];
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
      const p = toF(((y * 2 + dy) * W + (x * 2 + dx)) * 4);
      s[0] += p[0] / 4; s[1] += p[1] / 4; s[2] += p[2] / 4;
    }
    const m = Math.max(...s);
    const o = (y * w + x) * 4;
    if (m < 1e-32) continue;
    const e = Math.ceil(Math.log2(m) + 1e-9);
    const scale = 256 / Math.pow(2, e);
    out[o] = Math.min(255, Math.floor(s[0] * scale));
    out[o + 1] = Math.min(255, Math.floor(s[1] * scale));
    out[o + 2] = Math.min(255, Math.floor(s[2] * scale));
    out[o + 3] = e + 128;
  }
}

// --- Encode (RLE) ---
const chunks = [Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${h} +X ${w}\n`, 'latin1')];
for (let y = 0; y < h; y++) {
  const bytes = [2, 2, w >> 8, w & 255];
  for (let c = 0; c < 4; c++) {
    const ch = [];
    for (let x = 0; x < w; x++) ch.push(out[(y * w + x) * 4 + c]);
    let i = 0;
    while (i < w) {
      let run = 1;
      while (i + run < w && run < 127 && ch[i + run] === ch[i]) run++;
      if (run >= 3) {
        bytes.push(128 + run, ch[i]);
        i += run;
        continue;
      }
      const start = i;
      while (i < w && i - start < 128) {
        if (i + 2 < w && ch[i] === ch[i + 1] && ch[i] === ch[i + 2]) break;
        i++;
      }
      bytes.push(i - start, ...ch.slice(start, i));
    }
  }
  chunks.push(Buffer.from(bytes));
}
writeFileSync(output, Buffer.concat(chunks));
console.log(`OK ${W}x${H} -> ${w}x${h}`, output);
