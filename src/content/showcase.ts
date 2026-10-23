/**
 * O'quvchi paneli ekranlari — haqiqiy platformadan skrinshotlar. Nuqtalar foizda (16:10 rasm ustida).
 * Matnlar (sarlavha, izoh, nuqta izohlari) lug'atda — `showcase.steps`, shu tartibda.
 */
export interface ShowcaseStep {
  id: string;
  shot: string;
  spots: { x: number; y: number }[];
}

export const SHOWCASE: ShowcaseStep[] = [
  { id: 'bosh', shot: 'kid-home', spots: [{ x: 45, y: 33 }, { x: 45, y: 73 }, { x: 83, y: 26 }, { x: 83.5, y: 52 }] },
  { id: 'jadval', shot: 'kid-schedule', spots: [{ x: 45, y: 51 }, { x: 65, y: 33 }, { x: 58, y: 20 }, { x: 83.5, y: 37 }] },
  { id: 'oyin', shot: 'kid-play', spots: [{ x: 44.5, y: 43 }, { x: 42, y: 13 }, { x: 83, y: 72 }, { x: 83, y: 46 }] },
  { id: 'boshqotirma', shot: 'kid-puzzles', spots: [{ x: 58, y: 45 }, { x: 41, y: 20 }, { x: 37, y: 6 }, { x: 85.5, y: 68 }] },
  { id: 'profil', shot: 'kid-profile', spots: [{ x: 58.5, y: 46 }, { x: 58, y: 63 }, { x: 43.5, y: 86 }, { x: 82, y: 88 }] },
];

/** Koordinatalarni lug'atdagi matn bilan birlashtiradi (Hotspots uchun) */
export function withText(coords: { x: number; y: number }[], texts: { title: string; text: string }[]) {
  return coords.map((c, i) => ({ ...c, ...texts[i] }));
}
