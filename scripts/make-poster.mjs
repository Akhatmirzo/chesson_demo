// scripts/.poster.png (720x1200, shaffof) dan desktop va mobil poster WebP'larini yaratadi.
// Ishlatish: node scripts/make-poster.mjs
import sharp from 'sharp';

const src = 'scripts/.poster.png';
await sharp(src).webp({ quality: 82, alphaQuality: 90 }).toFile('public/poster/king.webp');
const trimmed = await sharp(src).trim({ threshold: 1 }).toBuffer();
const info = await sharp(trimmed)
  .resize({ height: 500 })
  .extend({ top: 14, bottom: 8, left: 36, right: 36, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 74, alphaQuality: 85 })
  .toFile('public/poster/king-m.webp');
console.log(`king.webp (720x1200), king-m.webp (${info.width}x${info.height})`);
console.log("Mobil poster o'lchami o'zgarsa, Hero.tsx dagi <source width/height> ni yangilang.");
