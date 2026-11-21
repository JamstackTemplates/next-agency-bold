import { useId } from 'react';
import type { ProcessStep } from '../../content/process';
import { formatStepWeeks } from '../../content/process';

const INK = '#111111';
const RED = '#C8301B';
const BLUE = '#2338E8';
const YELLOW = '#FFD23F';
const PAPER = '#FFFDF7';

/** Work: a bucket of wheatpaste with a brush, dripping, and a rolled poster leaning on it. */
export function PasteBucket({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const dots = `pb-dots-${uid}`;

  return (
    <svg viewBox="0 0 360 340" aria-hidden="true" className={`art-decorative h-auto w-full ${className}`}>
      <defs>
        <pattern id={dots} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <circle cx="4" cy="4" r="1.8" fill={INK} opacity="0.3" />
        </pattern>
      </defs>
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Rolled posters leaning behind */}
        <g transform="rotate(-16 250 200)">
          <rect x="226" y="60" width="44" height="230" rx="10" fill={BLUE} transform="translate(8 6)" />
          <rect x="226" y="60" width="44" height="230" rx="10" fill={RED} stroke={INK} strokeWidth="5" />
          <ellipse cx="248" cy="62" rx="22" ry="9" fill={PAPER} stroke={INK} strokeWidth="5" />
          <path d="M240 62 a8 4 0 1 0 16 0" stroke={INK} strokeWidth="3" fill="none" />
          <path d="M226 130 H270 M226 200 H270" stroke={PAPER} strokeWidth="6" />
        </g>

        {/* Bucket: blue plate then key */}
        <path d="M52 140 L232 140 L214 318 L70 318 Z" fill={BLUE} transform="translate(10 8)" />
        <path d="M52 140 L232 140 L214 318 L70 318 Z" fill={PAPER} stroke={INK} strokeWidth="5" />
        <path d="M150 140 L232 140 L214 318 L170 318 Z" fill={`url(#${dots})`} />
        <path d="M60 196 L224 196" stroke={INK} strokeWidth="4" />
        <rect x="76" y="214" width="132" height="58" fill={YELLOW} stroke={INK} strokeWidth="4" transform="rotate(-3 142 243)" />
        <text x="142" y="252" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="30" fill={INK} transform="rotate(-3 142 243)">PASTE</text>
        {/* Rim + paste surface */}
        <ellipse cx="142" cy="140" rx="92" ry="20" fill="#EDE6D3" stroke={INK} strokeWidth="5" />
        {/* Drips */}
        <path d="M72 142 C70 168 82 168 80 186 C78 196 90 196 88 182 C86 164 92 160 96 146" fill="#EDE6D3" stroke={INK} strokeWidth="4" />
        <path d="M196 150 C198 170 206 174 204 160 C202 152 206 150 208 146" fill="#EDE6D3" stroke={INK} strokeWidth="4" />
        {/* Handle */}
        <path d="M52 146 C30 70 254 70 232 146" stroke={INK} strokeWidth="6" fill="none" />

        {/* Brush */}
        <g transform="rotate(28 150 110)">
          <rect x="134" y="6" width="26" height="112" rx="12" fill={RED} stroke={INK} strokeWidth="5" />
          <rect x="122" y="112" width="50" height="22" fill="#B8B1A2" stroke={INK} strokeWidth="5" />
          <path d="M120 134 H174 L170 176 C160 184 134 184 124 176 Z" fill="#E7D9B4" stroke={INK} strokeWidth="5" />
          <path d="M134 140 V174 M147 140 V178 M160 140 V174" stroke={INK} strokeWidth="2.5" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

/** Services: a price-gun sticker showing the lowest starting fee. */
export function FeeSticker({ fee, className = '' }: { fee: string; className?: string }) {
  return (
    <div className={`pasted relative mx-auto aspect-square w-full max-w-[12rem] rotate-[7deg] sm:max-w-[18rem] ${className}`}>
      <svg viewBox="0 0 300 300" aria-hidden="true" className="art-decorative absolute inset-0 size-full">
        <circle cx="158" cy="156" r="138" fill={RED} />
        <circle cx="150" cy="150" r="138" fill={YELLOW} />
        <circle cx="150" cy="150" r="118" fill="none" stroke={INK} strokeWidth="3" strokeDasharray="6 7" />
      </svg>
      <div className="relative flex size-full flex-col items-center justify-center text-center text-[#111111]">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">Fees start</span>
        <span className="mt-1 font-display text-[clamp(2.6rem,7vw,4.25rem)] uppercase leading-[0.85]">{fee}</span>
        <span className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">+ VAT</span>
      </div>
    </div>
  );
}

/** Process: a gig setlist, written in marker and taped down. */
export function Setlist({ steps, className = '' }: { steps: readonly ProcessStep[]; className?: string }) {
  return (
    <div aria-hidden="true" className={`pasted relative mx-auto w-full max-w-[19rem] rotate-[3deg] ${className}`}>
      <div className="tear-bottom bg-[#FFFDF7] px-6 pt-6 pb-8 text-[#111111] [background-image:repeating-linear-gradient(180deg,transparent_0_33px,rgba(35,56,232,0.18)_33px_34px)]">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#B02815]">Setlist · wk 1–12</p>
        <ol className="mt-3 list-none space-y-1.5 p-0">
          {steps.map(step => (
            <li key={step.id} className="flex items-baseline justify-between gap-3">
              <span className="marker text-[1.6rem] leading-[1.05]">
                {step.step}. {step.name}
              </span>
              <span className="shrink-0 font-mono text-[10px] font-bold text-[#4A4740]">{formatStepWeeks(step.weeks).replace('Weeks ', 'w').replace('Week ', 'w')}</span>
            </li>
          ))}
        </ol>
        <p className="marker mt-3 -rotate-2 text-xl text-[#B02815]">encore: 30-day volume check!</p>
      </div>
      <span className="masking-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
    </div>
  );
}
