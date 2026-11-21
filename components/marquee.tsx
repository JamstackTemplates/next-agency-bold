'use client';

import { useState } from 'react';
import { Icon } from './art/icons';

/**
 * Full-bleed black tape band, tilted -2deg, yellow Anton client names separated by starbursts.
 * Pauses on hover, keyboard focus and via an explicit Pause/Play button (WCAG 2.2.2).
 * Under prefers-reduced-motion it renders static and wraps cleanly.
 */
export function Marquee({ clients }: { clients: readonly string[] }) {
  const [paused, setPaused] = useState(false);

  const renderItems = (duplicate: boolean) => (
    <ul
      aria-hidden={duplicate || undefined}
      className={`flex list-none items-center gap-8 p-0 ${duplicate ? 'marquee-duplicate' : ''}`}
    >
      {clients.map(client => (
        <li key={`${duplicate ? 'dup-' : ''}${client}`} className="flex shrink-0 items-center gap-8">
          <span className="font-display text-[2rem] uppercase leading-none tracking-[0.01em] text-yellow sm:text-[2.6rem]">
            {client}
          </span>
          <Icon name="starburst" className="size-7 shrink-0 text-[#FF4A2E]" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Recent clients"
      data-paused={paused ? 'true' : 'false'}
      className="marquee-band relative z-20 -mx-6 -my-4 -rotate-[1.8deg] bg-[#111111] py-4 shadow-[0_14px_24px_-10px_rgba(0,0,0,0.55)] [background-image:linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%,transparent_70%,rgba(0,0,0,0.4))] sm:py-5"
    >
      <div className="flex items-center gap-4 px-4 sm:px-6">
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track">
            {renderItems(false)}
            {renderItems(true)}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused(current => !current)}
          aria-pressed={paused}
          className="print-hide min-h-10 shrink-0 rounded-full border-2 border-[#F3EEE2]/40 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#F3EEE2] hover:border-yellow hover:text-yellow"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </section>
  );
}
