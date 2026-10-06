// Platforma skrinshotlari va murabbiy rasmlarini landing uchun yengil webp'ga o'giradi.
// Ishlatish: node scripts/build-images.mjs <skrinshotlar papkasi> <murabbiy rasmlari papkasi>
// Natija: public/shots/<nom>-{960,1600}.webp, public/coaches/coach-N.webp
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [shotsDir, coachesDir] = process.argv.slice(2);
if (!shotsDir || !coachesDir) {
  console.error('Ishlatish: node scripts/build-images.mjs <skrinshotlar> <murabbiylar>');
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, '..');
const outShots = path.join(root, 'public', 'shots');
const outCoaches = path.join(root, 'public', 'coaches');
await mkdir(outShots, { recursive: true });
await mkdir(outCoaches, { recursive: true });

// manba fayl → landingdagi nom
const SHOTS = {
  's01-bosh-sahifa.png': 'kid-home',
  's06-oyin.png': 'kid-play',
  's07-boshqotirma.png': 'kid-puzzles',
  's09-profil.png': 'kid-profile',
  's02-darsga-kirish.png': 'kid-schedule',
  'p01-ota-ona-bosh.png': 'parent-home',
  'p02-davomat.png': 'parent-attendance',
  'p03-tolovlar.png': 'parent-payments',
};
const PHONE = {
  's11-mobil-bosh.png': 'phone-home',
  's12-mobil-jadval.png': 'phone-schedule',
};

for (const [src, name] of Object.entries(SHOTS)) {
  for (const w of [960, 1600]) {
    await sharp(path.join(shotsDir, src)).resize({ width: w }).webp({ quality: 80 }).toFile(path.join(outShots, `${name}-${w}.webp`));
  }
}
for (const [src, name] of Object.entries(PHONE)) {
  await sharp(path.join(shotsDir, src)).resize({ width: 520 }).webp({ quality: 80 }).toFile(path.join(outShots, `${name}.webp`));
}
for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
  await sharp(path.join(coachesDir, `coach-${n}.png`))
    .resize({ width: 600, height: 750, fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: 78 })
    .toFile(path.join(outCoaches, `coach-${n}.webp`));
}
console.log('tayyor');
