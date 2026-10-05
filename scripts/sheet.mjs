// Dev yordamchi: bir nechta skrinshotni bitta varaqqa yig'adi. node scripts/sheet.mjs out.png col_eni a.png b.png ...
import sharp from 'sharp';
const [out, colW, ...files] = process.argv.slice(2);
const w = +colW;
const imgs = await Promise.all(files.map(async (f) => { const b = await sharp(f).resize(w).toBuffer({ resolveWithObject: true }); return b; }));
const cols = 2, gap = 10;
const rowH = []; for (let i = 0; i < imgs.length; i += cols) rowH.push(Math.max(...imgs.slice(i, i + cols).map((x) => x.info.height)));
const H = rowH.reduce((a, b) => a + b + gap, 0);
let y = 0; const comp = [];
for (let r = 0; r < rowH.length; r++) { for (let c = 0; c < cols; c++) { const im = imgs[r * cols + c]; if (im) comp.push({ input: im.data, left: c * (w + gap), top: y }); } y += rowH[r] + gap; }
await sharp({ create: { width: cols * w + gap, height: H, channels: 3, background: '#222' } }).composite(comp).png().toFile(out);
