/** Round yellow starburst sticker, slapped on at an angle, with the studio's availability. */
export function AvailabilitySticker({
  headline,
  note,
  className = '',
}: {
  headline: string;
  note?: string;
  className?: string;
}) {
  return (
    <p
      className={`pasted z-20 m-0 inline-flex size-36 shrink-0 rotate-[8deg] flex-col items-center justify-center p-5 text-center text-[#111111] sm:size-44 ${className}`}
    >
      <svg viewBox="0 0 220 220" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
        <path
          d="M110 4 L126 24 L152 12 L159 37 L188 35 L182 61 L210 72 L195 95 L216 116 L192 130 L203 156 L176 161 L177 189 L150 182 L139 210 L117 194 L97 215 L83 191 L56 202 L53 174 L25 174 L32 147 L6 136 L24 114 L4 94 L28 80 L17 54 L44 50 L44 22 L71 30 L82 4 L103 22 Z"
          fill="#FFD23F"
        />
        <circle cx="110" cy="110" r="78" fill="none" stroke="#111111" strokeWidth="2" strokeDasharray="4 5" opacity="0.6" />
      </svg>
      <span className="relative font-mono text-[9px] font-bold uppercase tracking-[0.18em] sm:text-[10px]">Studio status</span>
      <span className="relative mt-1 font-display text-[1.05rem] uppercase leading-[0.95] sm:text-[1.3rem]">{headline}</span>
      {note ? (
        <span className="relative mt-1.5 max-w-[8.5rem] font-mono text-[8.5px] font-bold leading-tight sm:text-[9.5px]">{note}</span>
      ) : null}
    </p>
  );
}
