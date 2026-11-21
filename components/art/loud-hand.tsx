import { useId } from 'react';

/*
 * The megaphone fist. A forearm bursts up from the bottom edge, gripping a red megaphone that is
 * aimed up and to the left (at whatever headline sits beside it). Drawn as a two-plate Riso print:
 * a blue plate slipped out of register behind a red/ink/paper key plate, with halftone shading.
 *
 * Everything is drawn in a local frame (megaphone pointing straight left, mouth at x≈60) and then
 * rotated, so the shapes stay simple and easy to edit.
 */

const INK = '#111111';
const RED = '#C8301B';
const BLUE = '#2338E8';
const YELLOW = '#FFD23F';
const PAPER = '#FFFDF7';

const MOUTH = { x: 267, y: 278 }; // mouth centre in canvas space (after rotation)
const AIM = 198; // degrees, screen space: up and to the left

function arc(radius: number, spread: number) {
  const a0 = ((AIM - spread) * Math.PI) / 180;
  const a1 = ((AIM + spread) * Math.PI) / 180;
  const x0 = MOUTH.x + radius * Math.cos(a0);
  const y0 = MOUTH.y + radius * Math.sin(a0);
  const x1 = MOUTH.x + radius * Math.cos(a1);
  const y1 = MOUTH.y + radius * Math.sin(a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${radius} ${radius} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

function starburst(cx: number, cy: number, inner: number, outer: number, points: number) {
  const out: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer * (i % 4 === 0 ? 1 : 0.82) : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    out.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${out.join(' L')} Z`;
}

/* Arm geometry in the local frame. Direction of the forearm = straight down the canvas. */
const ARM = 'M297 187 L402 153 L566 604 L431 648 Z';
const SLEEVE = 'M380 507 L524 460 L640 690 L455 760 Z';
const CUFF = 'M380 507 L524 460 L554 546 L406 594 Z';

/** Silhouette (or full drawing) of megaphone + fist + arm in the local frame. */
function Figure({ plate, dots }: { plate: boolean; dots: string }) {
  const fill = (colour: string) => (plate ? BLUE : colour);
  const stroke = plate ? 'none' : INK;
  const sw = plate ? 0 : 5;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* Forearm and rolled sleeve */}
      <path d={ARM} fill={fill(PAPER)} stroke={stroke} strokeWidth={sw} />
      {!plate && <path d="M372 172 L402 153 L566 604 L520 619 Z" fill={`url(#${dots})`} />}
      <path d={SLEEVE} fill={fill(INK)} stroke={stroke} strokeWidth={sw} />
      <path d={CUFF} fill={fill(INK)} stroke={plate ? 'none' : PAPER} strokeWidth={plate ? 0 : 2} />
      {!plate && (
        <path d="M393 545 L537 497" stroke={YELLOW} strokeWidth="5" strokeDasharray="16 12" />
      )}

      {/* Pistol grip under the rear tube */}
      <path d="M300 34 L358 34 L372 178 L314 178 Z" fill={fill(INK)} stroke={stroke} strokeWidth={sw} />

      {/* Cone */}
      <path d="M60 -112 L330 -40 L330 40 L60 112 Z" fill={fill(RED)} stroke={stroke} strokeWidth={sw} />
      {!plate && (
        <>
          <path d="M60 30 L330 16 L330 40 L60 112 Z" fill={`url(#${dots})`} />
          <path d="M96 -102 L120 -96 L120 96 L96 102 Z" fill={PAPER} stroke={INK} strokeWidth="4" />
          <path d="M150 -80 L300 -40" stroke={PAPER} strokeWidth="7" opacity="0.75" />
        </>
      )}
      {/* Rear tube */}
      <path d="M326 -40 H412 V40 H326 Z" fill={fill(PAPER)} stroke={stroke} strokeWidth={sw} />
      <ellipse cx="412" cy="0" rx="13" ry="40" fill={fill(INK)} stroke={stroke} strokeWidth={sw} />
      {!plate && <path d="M346 -40 V40 M364 -40 V40" stroke={INK} strokeWidth="3" opacity="0.6" />}

      {/* Bell mouth */}
      <ellipse cx="60" cy="0" rx="32" ry="114" fill={fill(YELLOW)} stroke={stroke} strokeWidth={sw} />
      {!plate && (
        <>
          <ellipse cx="66" cy="0" rx="20" ry="88" fill={INK} />
          <ellipse cx="70" cy="0" rx="7" ry="22" fill="#3A3733" />
        </>
      )}

      {/* Fist: back of hand, four curled fingers, thumb over the top */}
      <rect x="304" y="54" width="98" height="128" rx="34" fill={fill(PAPER)} stroke={stroke} strokeWidth={sw} />
      {!plate && <rect x="360" y="62" width="40" height="116" rx="20" fill={`url(#${dots})`} />}
      {[62, 94, 126, 158].map(y => (
        <g key={y}>
          <rect x="258" y={y} width="94" height="32" rx="16" fill={fill(PAPER)} stroke={stroke} strokeWidth={sw} />
          {!plate && <path d={`M300 ${y + 9} q8 7 0 14`} stroke={INK} strokeWidth="3" fill="none" />}
        </g>
      ))}
      <g transform="rotate(-8 330 50)">
        <rect x="270" y="34" width="122" height="32" rx="16" fill={fill(PAPER)} stroke={stroke} strokeWidth={sw} />
        {!plate && <rect x="276" y="40" width="26" height="20" rx="8" fill={YELLOW} stroke={INK} strokeWidth="3" />}
      </g>
    </g>
  );
}

export function LoudHand({
  className = '',
  compact = false,
  waves = true,
}: {
  className?: string;
  /** Crop tightly to the megaphone and fist. */
  compact?: boolean;
  /** Draw the sound-wave arcs and starburst. */
  waves?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const dots = `lh-dots-${uid}`;
  const frame = 'translate(210 260) rotate(18)';

  return (
    <svg
      viewBox={compact ? '40 70 600 560' : '0 0 640 720'}
      fill="none"
      aria-hidden="true"
      className={`art-decorative select-none ${className}`}
    >
      <defs>
        <pattern id={dots} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
          <circle cx="4.5" cy="4.5" r="2.1" fill={INK} opacity="0.32" />
        </pattern>
      </defs>

      {waves && (
        <g strokeLinecap="round">
          {/* Starburst flash in front of the mouth, blue plate first */}
          <path d={starburst(MOUTH.x - 44, MOUTH.y - 24, 74, 150, 12)} fill={BLUE} opacity="0.9" transform="translate(9 7)" />
          <path d={starburst(MOUTH.x - 44, MOUTH.y - 24, 74, 150, 12)} fill={YELLOW} stroke={INK} strokeWidth="4.5" strokeLinejoin="round" />

          {/* Sound waves: blue plate offset under red and ink strokes */}
          <g transform="translate(8 6)" stroke={BLUE} strokeWidth="11" opacity="0.85">
            <path d={arc(196, 30)} />
            <path d={arc(246, 27)} />
          </g>
          <path d={arc(196, 30)} stroke={RED} strokeWidth="11" />
          <path d={arc(246, 27)} stroke="var(--text, #111111)" strokeWidth="9" />
          <path d={arc(292, 22)} stroke={RED} strokeWidth="7" strokeDasharray="2 22" />

          {/* Little speed ticks off the rim */}
          <path d="M318 104 l20 -46 M362 132 l40 -30 M246 112 l-6 -40" stroke="var(--text, #111111)" strokeWidth="6" />
        </g>
      )}

      {/* Blue plate, slipped out of register */}
      <g transform={`translate(11 8) ${frame}`} opacity="0.95">
        <Figure plate dots={dots} />
      </g>
      {/* Key plate */}
      <g transform={frame}>
        <Figure plate={false} dots={dots} />
      </g>
    </svg>
  );
}
