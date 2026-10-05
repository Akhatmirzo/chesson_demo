'use client';

import { useState, type CSSProperties } from 'react';
import { CircleCheck, CircleX, RotateCcw } from 'lucide-react';
import { puzzle } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';
import ChessPiece from '@/components/ui/ChessPiece';

const FILES = 'abcdefgh';
const NAMES: Record<string, string> = { k: 'shoh', q: 'farzin', r: 'ruh', b: 'fil', n: 'ot', p: 'piyoda' };

/** "d8" -> [ustun, qator] (0..7, yuqoridan pastga) */
const toXY = (sq: string): [number, number] => [FILES.indexOf(sq[0]), 8 - Number(sq[1])];
const toSq = (x: number, y: number) => `${FILES[x]}${8 - y}`;

export default function Puzzle() {
  const [picked, setPicked] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [shake, setShake] = useState(0);
  const choice = picked === null ? null : puzzle.options[picked];
  const solved = !!choice?.correct;
  const active = puzzle.options[hover ?? picked ?? -1];
  const correctOpt = puzzle.options.find((o) => o.correct)!;
  const [kx, ky] = (() => {
    for (let y = 0; y < 8; y++) {
      const x = puzzle.board[y].indexOf('k');
      if (x >= 0) return [x, y];
    }
    return [-1, -1];
  })();

  const pick = (i: number) => {
    setPicked(i);
    if (!puzzle.options[i].correct) setShake((s) => s + 1);
  };

  // To'g'ri javobda ruh d1 -> d8 ga "suriladi" (faqat transform)
  const [fx, fy] = toXY(correctOpt.from);
  const [tx, ty] = toXY(correctOpt.to);

  return (
    <section id="mashq" className="cv bg-cream-deep py-20 lg:py-32" aria-labelledby="mashq-title">
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="self-end lg:col-span-5 lg:row-start-1">
          <SectionHeading id="mashq-title" eyebrow={puzzle.eyebrow} title={puzzle.title} lead={puzzle.lead} />
        </div>

        <div className="order-last lg:order-none lg:col-span-5 lg:row-start-2">
          <div data-stagger className="grid gap-3" role="group" aria-label="Javob variantlari">
            {puzzle.options.map((o, i) => {
              const state = picked === i ? (o.correct ? 'ok' : 'bad') : null;
              return (
                <button
                  key={o.move}
                  type="button"
                  data-stagger-item
                  onClick={() => pick(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  disabled={solved}
                  aria-pressed={picked === i}
                  className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition-colors disabled:cursor-default ${
                    state === 'ok'
                      ? 'border-forest bg-forest text-cream'
                      : state === 'bad'
                        ? 'border-coral bg-coral/10 text-ink'
                        : 'border-ink/10 bg-cream hover:border-forest'
                  }`}
                >
                  <span>
                    <span className="mr-3 inline-block w-6 opacity-55 tabular-nums">{String.fromCharCode(65 + i)}</span>
                    {o.move}
                  </span>
                  {state === 'ok' && <CircleCheck className="size-6" aria-hidden="true" />}
                  {state === 'bad' && <CircleX className="size-6 text-coral" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div aria-live="polite" className="mt-5 min-h-[5.5rem]">
            {choice && (
              <div key={`${picked}-${shake}`} className="puzzle-msg">
                <p className={`font-semibold ${solved ? 'text-forest' : 'text-[#b8381c]'}`}>{choice.explain}</p>
                <button
                  type="button"
                  onClick={() => setPicked(null)}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft underline-offset-4 hover:underline"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  {solved ? 'Qaytadan' : 'Yana urinib koʻrish'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="self-center lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div
            key={shake}
            className={`mx-auto w-full max-w-[560px] ${shake && !solved ? 'puzzle-shake' : ''}`}
            data-board
          >
            <div className="rounded-[24px] bg-forest p-3 shadow-[0_40px_80px_-40px_rgba(22,58,43,0.7)] sm:p-4">
              <div
                role="img"
                aria-label="Shaxmat pozitsiyasi: oq shoh g1, oq ruh d1, oq piyodalar f2, g2, h2; qora shoh g8, qora piyodalar f7, g7, h7, qora farzin c4, qora ruh a2."
                className="relative grid aspect-square grid-cols-8 grid-rows-8 overflow-hidden rounded-xl"
              >
                {puzzle.board.flatMap((row, y) =>
                  row.split('').map((cell, x) => {
                    const sq = toSq(x, y);
                    const dark = (x + y) % 2 === 1;
                    const isFrom = active && sq === active.from;
                    const isTo = active && sq === active.to;
                    const mated = solved && x === kx && y === ky;
                    const white = cell !== '.' && cell === cell.toUpperCase();
                    const movingAway = solved && sq === correctOpt.from;
                    return (
                      <div
                        key={sq}
                        data-square
                        className={`relative flex items-center justify-center ${dark ? 'bg-[#7fa58b]' : 'bg-[#eef3e6]'}`}
                      >
                        {(isFrom || isTo) && !solved && (
                          <span aria-hidden="true" className="absolute inset-0 bg-coral/45" />
                        )}
                        {mated && <span aria-hidden="true" className="puzzle-mate absolute inset-0 bg-coral" />}
                        {x === 0 && (
                          <span className={`absolute top-0.5 left-1 text-[10px] font-bold sm:text-xs ${dark ? 'text-[#eef3e6]' : 'text-[#5c8a6b]'}`}>
                            {8 - y}
                          </span>
                        )}
                        {y === 7 && (
                          <span className={`absolute right-1 bottom-0.5 text-[10px] font-bold sm:text-xs ${dark ? 'text-[#eef3e6]' : 'text-[#5c8a6b]'}`}>
                            {FILES[x]}
                          </span>
                        )}
                        {cell !== '.' && !movingAway && (
                          <ChessPiece
                            data-piece
                            piece={cell}
                            role="img"
                            aria-label={`${white ? 'oq' : 'qora'} ${NAMES[cell.toLowerCase()]}`}
                            className="relative size-[82%] drop-shadow-[0_2px_1px_rgba(0,0,0,0.18)]"
                          />
                        )}
                      </div>
                    );
                  }),
                )}

                {/* To'g'ri javob: ruh ko'chadi */}
                {solved && (
                  <div
                    aria-hidden="true"
                    className="puzzle-move pointer-events-none absolute flex items-center justify-center"
                    style={
                      {
                        width: '12.5%',
                        height: '12.5%',
                        left: `${fx * 12.5}%`,
                        top: `${fy * 12.5}%`,
                        '--dx': `${(tx - fx) * 100}%`,
                        '--dy': `${(ty - fy) * 100}%`,
                      } as CSSProperties
                    }
                  >
                    <ChessPiece piece="R" className="size-[82%] drop-shadow-[0_2px_1px_rgba(0,0,0,0.18)]" />
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-ink-soft">
              {solved ? 'Mat! Qora shoh qocha olmaydi.' : 'Oq yuradi va bir yurishda mat qiladi'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
