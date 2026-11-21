import type { ReactNode } from 'react';
import { business } from '../content/business';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** Concentric sound waves radiating in from the right edge, printed in two inks. */
function SoundBurst({ colour }: { colour: 'blue' | 'red' }) {
  const rings = [120, 200, 280, 360, 440, 520];
  const key = colour === 'blue' ? '#FFD23F' : '#111111';
  const second = colour === 'blue' ? '#C8301B' : '#FFD23F';
  const cx = 640;
  const cy = 320;
  const spread = (52 * Math.PI) / 180;
  const point = (r: number, sign: number) =>
    `${(cx - r * Math.cos(spread)).toFixed(1)} ${(cy + sign * r * Math.sin(spread)).toFixed(1)}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 640"
      preserveAspectRatio="xMaxYMid meet"
      className="art-decorative pointer-events-none absolute top-1/2 right-0 h-[115%] -translate-y-1/2 opacity-30 sm:opacity-60 lg:opacity-100"
    >
      <g fill="none" strokeLinecap="round">
        {rings.map((r, i) => (
          <path
            key={r}
            d={`M${point(r, -1)} A${r} ${r} 0 0 0 ${point(r, 1)}`}
            transform={i % 2 ? 'translate(9 7)' : undefined}
            stroke={i % 2 ? second : key}
            strokeWidth={i === 0 ? 30 : 22 - i * 2}
            strokeDasharray={i === rings.length - 1 ? '1 30' : undefined}
          />
        ))}
        <circle cx={cx} cy={cy} r="58" fill={key} />
      </g>
    </svg>
  );
}

function ClosingBandSection({
  children,
  colour = 'blue',
}: {
  children: ReactNode;
  colour?: 'blue' | 'red';
}) {
  return (
    <section className={`${colour === 'blue' ? 'texture-blue-band' : 'texture-red-band'} tear-top relative -mt-2 overflow-hidden py-20 sm:py-28`}>
      <SoundBurst colour={colour} />
      <div className="wrap relative z-10">
        <div className="max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

function Heading({ children }: ContentProps) {
  return (
    <h2 className="font-display text-[clamp(3.4rem,10vw,8rem)] uppercase leading-[0.86] tracking-[-0.005em] text-balance text-[#FFFFFF] [text-shadow:0.04em_0.035em_0_#111111]">
      {children}
    </h2>
  );
}

function Body({ children }: ContentProps) {
  return <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-[#FFFFFF] sm:text-xl">{children}</p>;
}

function Actions({ ctaLabel = 'Start a project enquiry' }: { ctaLabel?: string }) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
      <SiteLink href="/contact/" className="button button-yellow text-[1.05rem]">
        <span>{ctaLabel}</span>
        <Icon name="arrow" className="size-5" />
      </SiteLink>
      <a
        href={`mailto:${business.email}`}
        className="link-arrow font-mono text-[0.95rem] text-[#FFFFFF] [text-decoration-color:#FFD23F] hover:[text-decoration-color:#FFFFFF]"
      >
        <Icon name="mail" className="size-5" />
        <span>{business.email}</span>
      </a>
    </div>
  );
}

export const ClosingBand = Object.assign(ClosingBandSection, {
  Heading,
  Body,
  Actions,
});
