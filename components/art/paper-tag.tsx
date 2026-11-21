import type { ReactNode } from 'react';

const TONES = {
  yellow: 'bg-yellow text-[#111111]',
  ink: 'bg-[#141311] text-[#F3EEE2] dark:bg-[#F3EEE2] dark:text-[#111111]',
  red: 'bg-primary text-on-primary',
  paper: 'texture-surface text-ink',
  blue: 'bg-poster-blue text-[#FFFFFF]',
} as const;

/** Hand-cut paper label: angled snipped corners, Space Mono caps, no outline. */
export function PaperTag({
  children,
  tone = 'paper',
  rotate = 0,
  className = '',
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      className={`paper-tag px-3.5 py-1.5 font-mono text-[0.72rem] font-bold uppercase leading-tight tracking-[0.12em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
