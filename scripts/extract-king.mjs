// Bir martalik skript: ABeautifulGame.glb dan faqat qora qirolni ajratib, siqib chiqaradi.
// Ishlatish: node scripts/extract-king.mjs <kirish.glb> <chiqish.glb>
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, weld, simplify, textureCompress, meshopt, center, quantize } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptEncoder } from 'meshoptimizer';
import sharp from 'sharp';

const [, , input, output] = process.argv;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(input);
const root = doc.getRoot();
const scene = root.getDefaultScene() ?? root.listScenes()[0];

const isKing = (n) => n.getMesh()?.listPrimitives().some((p) => p.getMaterial()?.getName() === 'King_Black');
const king = root.listNodes().find(isKing);
if (!king) throw new Error('King_Black topilmadi');

// Dunyo matritsasini saqlab, qirolni sahnaning bevosita bolasiga aylantiramiz
const world = king.getWorldMatrix();
for (const child of scene.listChildren()) scene.removeChild(child);
king.getParentNode()?.removeChild(king);
king.setMatrix(world);
for (const c of king.listChildren()) king.removeChild(c);
scene.addChild(king);
king.setName('King');

for (const n of root.listNodes()) if (n !== king) n.dispose();
await MeshoptSimplifier.ready;
await doc.transform(
  prune(),
  dedup(),
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: 0.5, error: 0.0005 }),
  center({ pivot: 'below' }),
  textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024], quality: 82 }),
  quantize(),
  meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
  prune(),
);
await io.write(output, doc);
console.log('OK', output);
