import type { CSSProperties } from 'react';
import { formatStepWeeks, type ProcessStep } from '../../content/process';

const FADER_LEVELS = [30, 46, 62, 76, 90];
const KNOB_TURNS = [-120, -60, 0, 60, 120];
const LEDS = 10;

function Screw({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute size-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#8a847a,#3a3632)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6)] ${className}`}
    />
  );
}

/**
 * A five-channel studio mixing desk: one channel per step, labelled on masking-tape scribble
 * strips, with faders rising left to right. Horizontal faders on phones, vertical from `sm`.
 * Faders render at full height without JS or with reduced motion; where scroll-driven animation
 * is supported they slide up into place.
 */
export function MixingDesk({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <div className="relative rounded-md bg-[linear-gradient(180deg,#2b2825,#1a1816)] p-4 shadow-[0_0_0_1px_rgba(243,238,226,0.12),inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(0,0,0,0.8)] sm:p-6">
      <Screw className="top-2 left-2" />
      <Screw className="top-2 right-2" />
      <Screw className="bottom-2 left-2" />
      <Screw className="bottom-2 right-2" />

      {/* Meter bridge */}
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#F3EEE2]/12 px-1 pb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#B3AC9E]">
        <span>LH-5 · Running order</span>
        <span className="inline-flex items-center gap-2 text-[#FFD23F]">
          <span aria-hidden="true" className="inline-block size-2 rounded-full bg-[#FF4A2E] shadow-[0_0_8px_2px_rgba(255,74,46,0.7)]" />
          Wk 1–12
        </span>
      </div>

      <ol className="grid list-none gap-3 p-0 sm:grid-cols-5 sm:gap-2.5">
        {steps.map((step, index) => {
          const level = FADER_LEVELS[index] ?? 70;
          const lit = Math.round((level / 100) * LEDS);
          const style = { '--level': `${level}%` } as CSSProperties;

          return (
            <li
              key={step.id}
              style={style}
              className="grid grid-cols-[7.5rem_1fr] items-center gap-4 rounded-sm bg-[#151311] px-3 py-3 shadow-[inset_0_0_0_1px_rgba(243,238,226,0.07)] sm:flex sm:flex-col sm:items-stretch sm:gap-3 sm:px-2.5 sm:pt-4 sm:pb-3"
            >
              {/* Scribble strip: masking tape, written in marker */}
              <div className="sm:order-last">
                <span className="block bg-[#E9DFC2] px-2 py-1 text-[#111111] [clip-path:polygon(1%_6%,10%_0,30%_8%,55%_1%,80%_7%,99%_0,100%_92%,85%_100%,60%_93%,35%_100%,12%_94%,0_100%)] sm:text-center" style={{ transform: `rotate(${index % 2 ? 1.2 : -1.4}deg)` }}>
                  <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] opacity-70">Ch {String(step.step).padStart(2, '0')}</span>
                  <span className="marker block text-[1.35rem] leading-[0.95] sm:min-h-[2.6rem] sm:text-[1.3rem]">{step.name}</span>
                </span>
                <span className="mt-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFD23F] sm:text-center">
                  {formatStepWeeks(step.weeks)}
                </span>
              </div>

              <div aria-hidden="true" className="flex items-center gap-3 sm:flex-col sm:gap-4">
                {/* Gain knob */}
                <span className="relative hidden size-9 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#55504a,#1f1c19)] shadow-[0_2px_0_#000,inset_0_0_0_2px_rgba(0,0,0,0.5)] sm:block">
                  <span className="absolute left-1/2 top-1 h-3 w-[3px] -translate-x-1/2 rounded-full bg-[#F3EEE2] origin-[50%_14px]" style={{ transform: `translateX(-50%) rotate(${KNOB_TURNS[index] ?? 0}deg)` }} />
                </span>

                <div className="flex w-full items-center gap-2.5 sm:h-52 sm:w-auto sm:items-stretch sm:justify-center">
                  {/* Fader slot */}
                  <div className="relative h-8 flex-1 sm:h-auto sm:w-9 sm:flex-none">
                    <span className="absolute inset-x-1 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#050404] shadow-[inset_0_1px_2px_#000] sm:inset-x-auto sm:inset-y-1 sm:left-1/2 sm:top-auto sm:h-auto sm:w-1.5 sm:-translate-x-1/2 sm:translate-y-0" />
                    {/* Scale ticks */}
                    <span className="absolute inset-y-1 left-0 hidden w-2 bg-[repeating-linear-gradient(180deg,rgba(243,238,226,0.35)_0_1px,transparent_1px_12px)] sm:block" />
                    {/* Cap */}
                    <span className="fader-cap absolute top-1/2 left-[calc(var(--level)-1.1rem)] h-7 w-5 -translate-y-1/2 rounded-[3px] bg-[linear-gradient(90deg,#d9d2c3,#fffdf7_45%,#bdb5a5)] shadow-[0_3px_0_#000] sm:top-auto sm:bottom-[calc(var(--level)-1rem)] sm:left-1/2 sm:h-5 sm:w-9 sm:-translate-x-1/2 sm:translate-y-0 sm:bg-[linear-gradient(180deg,#d9d2c3,#fffdf7_45%,#bdb5a5)]">
                      <span className="absolute inset-y-1 left-1/2 w-[3px] -translate-x-1/2 bg-[#C8301B] sm:inset-x-1 sm:inset-y-auto sm:top-1/2 sm:left-1 sm:h-[3px] sm:w-auto sm:translate-x-0 sm:-translate-y-1/2" />
                    </span>
                  </div>

                  {/* LED meter */}
                  <div className="hidden flex-col-reverse justify-between py-1 sm:flex">
                    {Array.from({ length: LEDS }, (_, led) => (
                      <span
                        key={led}
                        className={`block h-2 w-2.5 rounded-[1px] ${
                          led < lit
                            ? led >= 8
                              ? 'bg-[#FF4A2E] shadow-[0_0_6px_rgba(255,74,46,0.8)]'
                              : led >= 6
                                ? 'bg-[#FFD23F] shadow-[0_0_6px_rgba(255,210,63,0.6)]'
                                : 'bg-[#7C88FF] shadow-[0_0_5px_rgba(124,136,255,0.6)]'
                            : 'bg-[#2A2622]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
