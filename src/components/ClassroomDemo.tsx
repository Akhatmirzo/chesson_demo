'use client';

import { useEffect, useRef, useState } from 'react';
import { Hand, LogOut, Mic, Video, LayoutGrid } from 'lucide-react';
import s from './ClassroomDemo.module.css';

/* ---------- taxta ---------- */
type Sq = string; // "e4"
const FILES = 'abcdefgh';
const pos = (sq: Sq) => ({ x: FILES.indexOf(sq[0]), y: 8 - Number(sq[1]) });

const START: Record<string, Sq> = {};
'RNBQKBNR'.split('').forEach((p, i) => {
  START[`w${p}${i}`] = `${FILES[i]}1`;
  START[`wP${i}`] = `${FILES[i]}2`;
  START[`b${p}${i}`] = `${FILES[i]}8`;
  START[`bP${i}`] = `${FILES[i]}7`;
});
const pieceImg = (id: string) => `/pieces/${id[0]}${id[1]}.svg`;

/* ---------- ssenariy: Italyan o'yini, ustoz f7 zaifligini tushuntiradi ---------- */
type Msg = { who: 'ustoz' | 'siz' | 'tizim'; text: string };
type Act =
  | { t: 'move'; from: Sq; to: Sq }
  | { t: 'arrow'; from: Sq; to: Sq }
  | { t: 'mark'; sq: Sq }
  | { t: 'chat'; msg: Msg }
  | { t: 'hand'; on: boolean }
  | { t: 'clear' }
  | { t: 'reset' };

const SCRIPT: [number, Act][] = [
  [900, { t: 'move', from: 'e2', to: 'e4' }],
  [900, { t: 'move', from: 'e7', to: 'e5' }],
  [900, { t: 'move', from: 'g1', to: 'f3' }],
  [900, { t: 'move', from: 'b8', to: 'c6' }],
  [900, { t: 'move', from: 'f1', to: 'c4' }],
  [900, { t: 'move', from: 'g8', to: 'f6' }],
  [1000, { t: 'arrow', from: 'f3', to: 'g5' }],
  [500, { t: 'arrow', from: 'c4', to: 'f7' }],
  [600, { t: 'chat', msg: { who: 'ustoz', text: "Ot g5 ga borsa — qaysi katak himoyasiz qoladi? 🤔" } }],
  [1500, { t: 'hand', on: true }],
  [300, { t: 'chat', msg: { who: 'tizim', text: "✋ Timur qo'l ko'tardi" } }],
  [1300, { t: 'chat', msg: { who: 'siz', text: 'f7! U yerni faqat shoh himoya qilyapti' } }],
  [500, { t: 'mark', sq: 'f7' }],
  [1100, { t: 'chat', msg: { who: 'ustoz', text: 'Barakalla! 🎉 +2 tanga' } }],
  [300, { t: 'hand', on: false }],
  [900, { t: 'clear' }],
  [200, { t: 'move', from: 'f3', to: 'g5' }],
  [3200, { t: 'reset' }],
];

interface State {
  pieces: Record<string, Sq>;
  arrows: { from: Sq; to: Sq }[];
  marks: Sq[];
  chat: Msg[];
  hand: boolean;
  last: [Sq, Sq] | null;
}
const initial = (): State => ({ pieces: { ...START }, arrows: [], marks: [], chat: [{ who: 'ustoz', text: "Salom, Timur! Bugun ochilishdagi tuzoqlarni o'rganamiz 👋" }], hand: false, last: null });

function apply(st: State, a: Act): State {
  switch (a.t) {
    case 'move': {
      const id = Object.keys(st.pieces).find((k) => st.pieces[k] === a.from);
      if (!id) return st;
      const pieces = { ...st.pieces };
      for (const k of Object.keys(pieces)) if (pieces[k] === a.to) delete pieces[k];
      pieces[id] = a.to;
      return { ...st, pieces, last: [a.from, a.to] };
    }
    case 'arrow':
      return { ...st, arrows: [...st.arrows, { from: a.from, to: a.to }] };
    case 'mark':
      return { ...st, marks: [...st.marks, a.sq] };
    case 'chat':
      return { ...st, chat: [...st.chat, a.msg].slice(-4) };
    case 'hand':
      return { ...st, hand: a.on };
    case 'clear':
      return { ...st, arrows: [], marks: [] };
    case 'reset':
      return initial();
  }
}

/** Darsning tugagan holati (animatsiyasiz rejim uchun) */
function finalState(): State {
  return SCRIPT.slice(0, -3).reduce((st, [, a]) => apply(st, a), initial());
}

export function ClassroomDemo() {
  const [st, setSt] = useState<State>(initial);
  const [userHand, setUserHand] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSt(finalState());
      return;
    }
    let i = 0;
    let timer: number | undefined;
    let visible = false;
    const tick = () => {
      if (!visible) return;
      const [delay, act] = SCRIPT[i];
      timer = window.setTimeout(() => {
        setSt((prev) => apply(prev, act));
        i = (i + 1) % SCRIPT.length;
        tick();
      }, delay);
    };
    const io = new IntersectionObserver(
      ([en]) => {
        const was = visible;
        visible = en.isIntersecting;
        if (visible && !was) tick();
        if (!visible) clearTimeout(timer);
      },
      { threshold: 0.35 },
    );
    if (root.current) io.observe(root.current);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [st.chat]);

  const hand = st.hand || userHand;

  return (
    <div className={s.room} ref={root}>
      <div className={s.top}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pieces/wN.svg" alt="" width={20} height={20} className={s.knight} />
        <div className={s.meta}>
          <b>Guruh darsi · Debyut-1</b>
          <span>Ustoz Elbek Jumanov · 57 daqiqa qoldi</span>
        </div>
        <span className={s.seg} aria-hidden="true">
          <i className={s.segOn}>Taxta</i>
          <i>
            <LayoutGrid size={12} /> Galereya
          </i>
        </span>
        <span className={s.exit} aria-hidden="true">
          <LogOut size={13} /> Chiqish
        </span>
      </div>

      <div className={s.body}>
        <div className={s.boardWrap}>
          <div className={s.board} role="img" aria-label="Ustoz taxtada Italyan o'yinini ko'rsatmoqda: o'qlar f7 katakka ishora qiladi">
            {Array.from({ length: 64 }, (_, k) => {
              const x = k % 8;
              const y = Math.floor(k / 8);
              const sq = `${FILES[x]}${8 - y}`;
              const isLast = st.last?.includes(sq);
              return (
                <span key={k} className={`${(x + y) % 2 ? s.dark : s.light} ${isLast ? s.lastMove : ''}`}>
                  {x === 0 && <em className={s.rank}>{8 - y}</em>}
                  {y === 7 && <em className={s.file}>{FILES[x]}</em>}
                </span>
              );
            })}
            {Object.entries(st.pieces).map(([id, sq]) => {
              const p = pos(sq);
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={id}
                  src={pieceImg(id)}
                  alt=""
                  className={s.piece}
                  style={{ transform: `translate(${p.x * 100}%, ${p.y * 100}%)` }}
                  draggable={false}
                />
              );
            })}
            <svg className={s.overlay} viewBox="0 0 8 8" aria-hidden="true">
              <defs>
                <marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              {st.marks.map((m) => {
                const p = pos(m);
                return <circle key={m} className={s.mark} cx={p.x + 0.5} cy={p.y + 0.5} r={0.44} />;
              })}
              {st.arrows.map((a) => {
                const f = pos(a.from);
                const t = pos(a.to);
                const dx = t.x - f.x;
                const dy = t.y - f.y;
                const len = Math.hypot(dx, dy);
                const ex = t.x + 0.5 - (dx / len) * 0.32;
                const ey = t.y + 0.5 - (dy / len) * 0.32;
                return (
                  <line
                    key={a.from + a.to}
                    className={s.arrow}
                    x1={f.x + 0.5}
                    y1={f.y + 0.5}
                    x2={ex}
                    y2={ey}
                    pathLength={1}
                    markerEnd="url(#ah)"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className={s.side}>
          <div className={s.cams}>
            <figure className={`${s.cam} ${s.speaking}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/coaches/coach-1.webp" alt="" loading="lazy" width={300} height={375} />
              <figcaption>Elbek Jumanov</figcaption>
            </figure>
            <figure className={`${s.cam} ${s.kidCam}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/avatar-me.webp" alt="" loading="lazy" width={160} height={160} />
              <figcaption>Timur (siz)</figcaption>
              {hand && (
                <span className={s.handBadge} aria-label="Qo'l ko'tarilgan">
                  ✋
                </span>
              )}
            </figure>
          </div>
          <div className={s.chat} ref={chatRef} aria-live="polite">
            {st.chat.map((m, i) => (
              <p key={`${i}-${m.text}`} className={`${s.msg} ${s[m.who]}`}>
                {m.who !== 'tizim' && <b>{m.who === 'ustoz' ? 'Ustoz' : 'Siz'}</b>}
                {m.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={s.bottom}>
        <span className={s.ctl} aria-hidden="true">
          <Mic size={16} />
        </span>
        <span className={s.ctl} aria-hidden="true">
          <Video size={16} />
        </span>
        <button type="button" className={`${s.handBtn} ${hand ? s.handOn : ''}`} onClick={() => setUserHand((h) => !h)} aria-pressed={userHand}>
          <Hand size={16} aria-hidden="true" /> {userHand ? "Qo'lni tushirish" : "Qo'l ko'tarish"}
        </button>
      </div>
    </div>
  );
}
