import { useId } from 'react';

/**
 * 404 illustration: the same hand drawn with one finger to the lips of a cut-paper mouth,
 * the megaphone dropped beside it, sound waves crossed out.
 */
export function ShhHand({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const dotsId = `shh-dots-${uid}`;

  return (
    <svg viewBox="0 0 460 380" fill="none" aria-hidden="true" className={`art-decorative select-none ${className}`}>
      <defs>
        <pattern id={dotsId} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.8" fill="var(--text)" opacity="0.2" />
        </pattern>
      </defs>

      {/* Crossed-out sound waves top-left */}
      <g opacity="0.85">
        <path d="M62 84 C44 106 44 138 62 160" stroke="var(--blue)" strokeWidth="5" strokeLinecap="round" />
        <path d="M88 98 C76 112 76 132 88 146" stroke="var(--blue)" strokeWidth="5" strokeLinecap="round" />
        <path d="M36 74 L112 168 M112 74 L36 168" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Cut-paper mouth with blue overprint */}
      <g transform="translate(6, 5)" opacity="0.65">
        <path d="M134 128 C166 86 218 88 238 114 C258 88 310 86 342 128 C306 164 170 164 134 128 Z" fill="var(--blue)" />
      </g>
      <path
        d="M130 124 C162 82 214 84 234 110 C254 84 306 82 338 124 C302 162 166 162 130 124 Z"
        fill="var(--primary)"
        stroke="var(--text)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path d="M148 124 Q234 138 320 124" stroke="#111111" strokeWidth="4" strokeLinecap="round" />

      {/* Dropped megaphone resting on ground bottom-right */}
      <g transform="translate(274, 248) rotate(22)">
        <path d="M6 12 L94 28 L88 64 L-6 58 Z" fill="var(--primary)" stroke="var(--text)" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="0" cy="35" rx="11" ry="23" fill="#141311" stroke="var(--text)" strokeWidth="3.5" />
        <path d="M92 28 L112 34 L108 62 L88 64 Z" fill="var(--yellow)" stroke="var(--text)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M52 60 L44 88 L64 92 L72 62 Z" fill="#141311" stroke="var(--text)" strokeWidth="3.5" />
      </g>

      {/* Hand rising vertically with one shushing finger across lips */}
      <g stroke="var(--text)" strokeWidth="4.5" strokeLinejoin="round">
        {/* Forearm */}
        <path d="M188 272 L276 272 L292 378 L174 378 Z" fill="var(--surface)" />
        <path d="M236 272 L276 272 L292 378 L244 378 Z" fill={`url(#${dotsId})`} stroke="none" />
        {/* Palm */}
        <rect x="176" y="182" width="114" height="100" rx="28" fill="var(--surface)" />
        {/* Curled fingers */}
        <rect x="176" y="186" width="38" height="44" rx="14" fill="var(--surface)" />
        <rect x="246" y="188" width="44" height="32" rx="12" fill="var(--surface)" />
        <rect x="248" y="218" width="42" height="30" rx="12" fill="var(--surface)" />
        {/* Raised shushing index finger */}
        <rect x="212" y="76" width="36" height="134" rx="18" fill="var(--yellow)" />
        <path d="M222 104 H238" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" />
        {/* Thumb */}
        <path d="M174 220 C156 220 150 242 162 258 L194 268 L206 236 Z" fill="var(--surface)" />
      </g>
    </svg>
  );
}
