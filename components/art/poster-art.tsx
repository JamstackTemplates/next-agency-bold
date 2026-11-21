import { useId } from 'react';
import type { PosterColour, PosterMotif } from '../../content/projects';

const COLOUR_STYLES: Record<
  PosterColour,
  {
    bg: string;
    fg: string;
    accent: string;
    overprint: string;
    stroke: string;
  }
> = {
  red: {
    bg: '#C8301B',
    fg: '#FFFFFF',
    accent: '#FFD23F',
    overprint: '#2338E8',
    stroke: '#111111',
  },
  yellow: {
    bg: '#FFD23F',
    fg: '#111111',
    accent: '#C8301B',
    overprint: '#2338E8',
    stroke: '#111111',
  },
  blue: {
    bg: '#2338E8',
    fg: '#FFFFFF',
    accent: '#FFD23F',
    overprint: '#C8301B',
    stroke: '#111111',
  },
  ink: {
    bg: '#151412',
    fg: '#F3EEE2',
    accent: '#FFD23F',
    overprint: '#C8301B',
    stroke: '#F3EEE2',
  },
  paper: {
    bg: '#FFFDF7',
    fg: '#111111',
    accent: '#C8301B',
    overprint: '#2338E8',
    stroke: '#111111',
  },
};

function MotifIllustration({
  motif,
  stroke,
  accent,
  overprint,
  fg,
  dotsId,
}: {
  motif: PosterMotif;
  stroke: string;
  accent: string;
  overprint: string;
  fg: string;
  dotsId: string;
}) {
  switch (motif) {
    case 'sunburst-cup':
      return (
        <g>
          {/* Radiating sunburst rays */}
          <g stroke={accent} strokeWidth="7" strokeLinecap="round">
            <line x1="160" y1="22" x2="160" y2="66" />
            <line x1="86" y1="42" x2="114" y2="78" />
            <line x1="234" y1="42" x2="206" y2="78" />
            <line x1="42" y1="96" x2="86" y2="112" />
            <line x1="278" y1="96" x2="234" y2="112" />
          </g>
          {/* Overprint shadow */}
          <path d="M98 118 H226 L210 218 H114 Z" fill={overprint} transform="translate(6, 5)" opacity="0.7" />
          {/* Coffee cup */}
          <path d="M94 114 H222 L206 216 H110 Z" fill="#FFFDF7" stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M218 134 C252 134 252 184 210 184" fill="none" stroke="#FFFDF7" strokeWidth="10" strokeLinecap="round" />
          <path d="M218 134 C252 134 252 184 210 184" fill="none" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
          {/* Steam & cup stripe */}
          <path d="M102 152 H214 L210 180 H106 Z" fill={accent} stroke={stroke} strokeWidth="3.5" />
          <path d="M136 96 C128 82 146 72 138 56 M166 94 C158 78 176 68 168 50 M194 98 C186 84 202 74 194 60" stroke={fg} strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="76" y="216" width="168" height="14" rx="4" fill={stroke} />
        </g>
      );

    case 'curtain-shout':
      return (
        <g>
          {/* Stage curtains pulled aside */}
          <path d="M20 20 H116 C92 94 76 164 20 226 Z" fill={accent} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M300 20 H204 C228 94 244 164 300 226 Z" fill={accent} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M20 20 H300 V48 C238 66 82 66 20 48 Z" fill={overprint} stroke={stroke} strokeWidth="4.5" />
          {/* Open shouting mouth */}
          <ellipse cx="164" cy="144" rx="64" ry="50" fill={overprint} transform="translate(5, 5)" opacity="0.65" />
          <ellipse cx="160" cy="140" rx="64" ry="50" fill="#111111" stroke={stroke} strokeWidth="4.5" />
          {/* Upper teeth + tongue */}
          <path d="M112 114 H208 L198 130 H122 Z" fill="#FFFDF7" stroke="#111111" strokeWidth="3" />
          <path d="M126 172 C142 150 178 150 194 172 C176 188 144 188 126 172 Z" fill="#C8301B" />
          {/* Sound dashes */}
          <path d="M160 66 V84 M114 78 L126 94 M206 78 L194 94" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
        </g>
      );

    case 'spinning-disc':
      return (
        <g>
          {/* Motion speed arcs */}
          <path d="M46 126 A114 114 0 0 1 134 26" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
          <path d="M274 134 A114 114 0 0 1 186 232" fill="none" stroke={overprint} strokeWidth="6" strokeLinecap="round" />
          {/* Vinyl record */}
          <circle cx="164" cy="134" r="88" fill={overprint} opacity="0.7" />
          <circle cx="158" cy="128" r="88" fill="#111111" stroke={stroke} strokeWidth="4.5" />
          <circle cx="158" cy="128" r="70" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray="18 8" opacity="0.55" />
          <circle cx="158" cy="128" r="54" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray="12 10" opacity="0.45" />
          {/* Centre yellow label */}
          <circle cx="158" cy="128" r="34" fill={accent} stroke="#111111" strokeWidth="4" />
          <circle cx="158" cy="128" r="8" fill="#111111" />
          {/* Tonearm */}
          <path d="M254 44 L224 146 L204 162" fill="none" stroke="#FFFDF7" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="254" cy="44" r="11" fill={overprint} stroke={stroke} strokeWidth="3.5" />
        </g>
      );

    case 'oar-stripes':
      return (
        <g>
          {/* Rowing lane water stripes */}
          {[56, 94, 132, 170, 208].map(y => (
            <path
              key={y}
              d={`M22 ${y} Q90 ${y - 12} 160 ${y} T298 ${y}`}
              fill="none"
              stroke={y % 76 === 18 ? accent : '#FFFFFF'}
              strokeWidth="6"
              opacity={y === 132 ? 0.95 : 0.45}
            />
          ))}
          {/* Overprint shadow of crossed oars */}
          <g transform="translate(6, 5)" opacity="0.75">
            <path d="M54 34 L268 214 M266 34 L52 214" stroke={overprint} strokeWidth="14" strokeLinecap="round" />
          </g>
          {/* Crossed oars */}
          <g stroke={stroke} strokeWidth="4" strokeLinejoin="round">
            <path d="M46 30 L246 196" stroke="#FFFDF7" strokeWidth="11" strokeLinecap="round" />
            <path d="M274 30 L74 196" stroke="#FFFDF7" strokeWidth="11" strokeLinecap="round" />
            {/* Left blade */}
            <path d="M36 184 L96 156 L112 178 L58 216 Z" fill={accent} />
            {/* Right blade */}
            <path d="M284 184 L224 156 L208 178 L262 216 Z" fill={accent} />
          </g>
          <circle cx="160" cy="124" r="14" fill={overprint} stroke={stroke} strokeWidth="4" />
        </g>
      );

    case 'door-grid':
      return (
        <g>
          {/* Grid of twelve distinct front doors (4x3) */}
          {Array.from({ length: 12 }, (_, idx) => {
            const col = idx % 4;
            const row = Math.floor(idx / 4);
            const x = 34 + col * 66;
            const y = 26 + row * 70;
            const fills = ['#C8301B', '#FFD23F', '#2338E8', '#111111', '#FFD23F', '#2338E8', '#C8301B', '#FFFDF7', '#2338E8', '#111111', '#FFD23F', '#C8301B'];
            const fill = fills[idx];
            const knob = fill === '#111111' ? '#FFD23F' : '#111111';
            const arched = idx % 3 === 0;
            return (
              <g key={idx} transform={`translate(${x}, ${y})`}>
                <rect x="4" y="4" width="48" height="58" fill={overprint} opacity="0.22" />
                {arched ? (
                  <path d="M0 20 A24 20 0 0 1 48 20 V58 H0 Z" fill={fill} stroke={stroke} strokeWidth="3.5" />
                ) : (
                  <rect width="48" height="58" fill={fill} stroke={stroke} strokeWidth="3.5" />
                )}
                {/* Transom / panel detail */}
                {idx % 2 === 0 ? (
                  <rect x="10" y="14" width="28" height="14" fill="#FFFDF7" stroke={stroke} strokeWidth="2.5" />
                ) : (
                  <circle cx="24" cy="20" r="8" fill="#FFFDF7" stroke={stroke} strokeWidth="2.5" />
                )}
                <circle cx="38" cy="38" r="3" fill={knob} />
              </g>
            );
          })}
        </g>
      );

    case 'lantern-arrows':
      return (
        <g>
          {/* Catwalk wires */}
          <path d="M18 52 Q160 88 302 44" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 5" />
          <path d="M18 148 Q160 112 302 152" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 5" />
          {/* Glowing paper lanterns forming a right-pointing arrow */}
          {[
            { cx: 74, cy: 102, r: 22, fill: '#FFD23F' },
            { cx: 128, cy: 102, r: 24, fill: '#C8301B' },
            { cx: 184, cy: 102, r: 25, fill: '#FFD23F' },
            { cx: 242, cy: 102, r: 27, fill: '#FFFDF7' },
            { cx: 192, cy: 52, r: 20, fill: '#FFD23F' },
            { cx: 192, cy: 156, r: 20, fill: '#C8301B' },
          ].map((l, i) => (
            <g key={i}>
              <circle cx={l.cx + 4} cy={l.cy + 4} r={l.r} fill="#111111" opacity="0.4" />
              <circle cx={l.cx} cy={l.cy} r={l.r} fill={l.fill} stroke={stroke} strokeWidth="3.8" />
              <line x1={l.cx} y1={l.cy - l.r} x2={l.cx} y2={l.cy + l.r} stroke={stroke} strokeWidth="2" opacity="0.45" />
              <line x1={l.cx - l.r * 0.7} y1={l.cy} x2={l.cx + l.r * 0.7} y2={l.cy} stroke={stroke} strokeWidth="2" opacity="0.45" />
              <rect x={l.cx - 6} y={l.cy + l.r - 1} width="12" height="7" fill="#111111" />
            </g>
          ))}
          {/* Bold arrow shaft underneath */}
          <path d="M44 206 H260 M230 182 L262 206 L230 230" fill="none" stroke={accent} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );

    case 'chainring':
      return (
        <g>
          {/* Horizon road */}
          <path d="M18 192 H302 V234 H18 Z" fill="#111111" />
          <path d="M138 192 L82 234 M182 192 L238 234" stroke="#FFFDF7" strokeWidth="5" />
          <path d="M160 198 V228" stroke={accent} strokeWidth="5" strokeDasharray="8 6" />
          {/* Bike chainring rising like a sun */}
          <g transform="translate(5, 4)" opacity="0.65">
            <circle cx="160" cy="134" r="68" fill={overprint} />
          </g>
          <g transform="translate(160, 132)">
            {/* Gear teeth */}
            {Array.from({ length: 16 }, (_, idx) => (
              <rect
                key={idx}
                x="-7"
                y="-78"
                width="14"
                height="18"
                fill={accent}
                stroke={stroke}
                strokeWidth="3"
                transform={`rotate(${idx * 22.5})`}
              />
            ))}
            <circle r="64" fill={accent} stroke={stroke} strokeWidth="4.5" />
            <circle r="44" fill="#FFFDF7" stroke={stroke} strokeWidth="4" />
            {/* 5 crank spider arms */}
            {[0, 72, 144, 216, 288].map(deg => (
              <line key={deg} x1="0" y1="0" x2="0" y2="-44" stroke={stroke} strokeWidth="7" transform={`rotate(${deg})`} />
            ))}
            <circle r="15" fill="#111111" stroke={stroke} strokeWidth="3.5" />
          </g>
        </g>
      );

    case 'flame-label':
      return (
        <g>
          {/* Roaring flames behind bottle label */}
          <path
            d="M72 224 C46 168 78 124 102 96 C98 128 118 134 128 106 C144 66 154 32 162 20 C184 56 196 84 192 114 C210 96 220 74 226 62 C258 108 268 164 248 224 Z"
            fill={accent}
            stroke={stroke}
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <path
            d="M98 224 C86 184 108 150 128 128 C134 148 148 144 160 110 C182 142 192 162 196 182 C212 162 224 186 220 224 Z"
            fill={overprint}
            opacity="0.55"
          />
          {/* Cut-paper hot sauce bottle label */}
          <rect x="94" y="106" width="136" height="104" fill="#FFFDF7" stroke={stroke} strokeWidth="4.5" transform="rotate(-3 162 158)" />
          <rect x="104" y="116" width="116" height="84" fill="none" stroke="#C8301B" strokeWidth="3" transform="rotate(-3 162 158)" />
          {/* Chilli emblem */}
          <path
            d="M148 140 C166 140 184 156 188 178 C166 186 144 176 138 156 C136 148 140 140 148 140 Z"
            fill="#C8301B"
            stroke="#111111"
            strokeWidth="3.5"
          />
          <path d="M142 142 C136 132 142 124 152 124" fill="none" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="114" y="182" width="96" height="10" fill={`url(#${dotsId})`} />
        </g>
      );
  }
}

/**
 * A wheatpasted gig-style street poster: torn top and bottom, paste wrinkles, small-print header,
 * the bespoke motif and the project title set big in Anton with the second ink out of register.
 * Wrap in `.poster-card` to get the straighten/lift/peel interaction.
 */
export function PosterArt({
  colour,
  motif,
  title,
  client,
  year,
  compact = false,
  headingLevel = 'h3',
}: {
  colour: PosterColour;
  motif: PosterMotif;
  title: string;
  client: string;
  year: number;
  compact?: boolean;
  headingLevel?: 'h2' | 'h3' | 'p';
}) {
  const uid = useId().replace(/:/g, '');
  const dotsId = `poster-dots-${uid}`;
  const palette = COLOUR_STYLES[colour];
  const Title = headingLevel;

  return (
    <div className="pasted relative">
      <div
        className="poster-sheet tear-both relative overflow-hidden pt-2 pb-2"
        style={{ backgroundColor: palette.bg, color: palette.fg }}
      >
        <span className="poster-peel" aria-hidden="true" />
        <span className="paste-wrinkle absolute inset-0 z-20" aria-hidden="true" />

        {/* Small print, as on a gig poster */}
        <div className="relative z-10 flex items-baseline justify-between gap-3 px-4 pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-90">
          <span className="truncate">{compact ? client : `Loud Hands × ${client}`}</span>
          <span>{year}</span>
        </div>

        <div className="relative z-10 px-3 pt-1">
          <svg viewBox="0 0 320 245" className="block h-auto w-full" aria-hidden="true">
            <defs>
              <pattern id={dotsId} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
                <circle cx="4" cy="4" r="1.8" fill={palette.stroke} opacity="0.2" />
              </pattern>
            </defs>
            <rect width="320" height="245" fill={`url(#${dotsId})`} />
            <MotifIllustration
              motif={motif}
              stroke={palette.stroke}
              accent={palette.accent}
              overprint={palette.overprint}
              fg={palette.fg}
              dotsId={dotsId}
            />
          </svg>
        </div>

        <div className="relative z-10 px-4 pt-1 pb-5">
          <Title
            className={`font-display uppercase leading-[0.86] tracking-[-0.005em] text-balance ${compact ? 'text-[1.7rem] sm:text-[2.35rem]' : 'text-[2.4rem] sm:text-[2.9rem]'}`}
            style={{ color: palette.fg, textShadow: `0.045em 0.04em 0 ${palette.overprint}` }}
          >
            {title}
          </Title>
          <div className={`mt-3 items-center gap-2 border-t-2 pt-2 ${compact ? 'hidden sm:flex' : 'flex'} font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-85`} style={{ borderColor: palette.stroke }}>
            <span>Stevenson Sq.</span>
            <span aria-hidden="true">✶</span>
            <span>Manchester</span>
          </div>
        </div>
      </div>
    </div>
  );
}
