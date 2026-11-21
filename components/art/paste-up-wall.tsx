import type { ReactNode } from 'react';

/** Coach-bolt head on the hoarding. */
function Bolt({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`art-decorative pointer-events-none absolute size-3.5 ${className}`}>
      <circle cx="10" cy="10" r="8" fill="#8E8573" />
      <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="3" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

/** Ghosts of old posters scraped off the board: shreds of paper and paste stains. */
function OldPaste() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="art-decorative print-hide pointer-events-none absolute inset-0 size-full"
    >
      <g opacity="0.38">
        <path d="M-10 40 L210 22 L198 120 L150 112 L120 168 L60 150 L20 196 L-10 190 Z" fill="var(--surface)" opacity="0.55" />
        <path d="M30 60 L180 48" stroke="var(--primary)" strokeWidth="18" opacity="0.35" />
        <path d="M980 560 L1210 530 L1210 720 L1000 720 L1012 660 Z" fill="var(--yellow)" opacity="0.4" />
        <path d="M1090 140 L1210 130 L1210 300 L1140 290 L1104 230 Z" fill="var(--surface)" opacity="0.45" />
        <ellipse cx="380" cy="640" rx="170" ry="60" fill="var(--paste)" opacity="0.55" />
        <ellipse cx="900" cy="80" rx="140" ry="40" fill="var(--paste)" opacity="0.45" />
      </g>
    </svg>
  );
}

/**
 * Full-bleed plywood hoarding: board seams, grain, bolts, scraps of old posters and,
 * after dark, the sodium lamp pooling at the top.
 */
export function PasteUpWall({
  children,
  className = '',
  id,
  ariaLabelledBy,
  ariaLabel,
  padding = 'py-16 sm:py-24',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
  ariaLabel?: string;
  padding?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={`texture-plywood relative overflow-x-clip ${padding} ${className}`}
    >
      {/* Top and bottom edges of the boards */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/25 to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-black/20 to-transparent" />
      <OldPaste />
      <Bolt className="top-4 left-4" />
      <Bolt className="top-4 right-4" />
      <Bolt className="top-4 left-[calc(50%+10px)] hidden md:block" />
      <Bolt className="bottom-4 left-4" />
      <Bolt className="bottom-4 right-4" />
      <Bolt className="bottom-4 left-[calc(50%+10px)] hidden md:block" />
      <div className="wrap relative z-10">{children}</div>
    </section>
  );
}
