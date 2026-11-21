import type { SVGProps } from 'react';
import type { Discipline } from '../../content/projects';

export type IconName =
  | Discipline
  | 'pointing-hand'
  | 'arrow'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'starburst'
  | 'menu';

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
};

/** 24px hand-inked bold icons matching the 2.5px–3px cut-paper studio style. */
export function Icon({ name, className = 'size-5 shrink-0', ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {name === 'brand' && (
        <>
          <path d="M5 17h14v3H5z" fill="currentColor" opacity="0.2" />
          <path d="M9 5c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5c0 1.4-1 2.2-1 3.8V12h4.5l1 5H4.5l1-5H10V8.8C10 7.2 9 6.4 9 5Z" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M4 20h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {name === 'campaign' && (
        <>
          <path d="M4 10.5L18.5 5v12L4 13.5v-3Z" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M7.5 14l1.5 5.5H6L4.5 13.8" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M21 8.5l1.5-1M21.5 11.5h1.5M21 14.5l1.5 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {name === 'motion' && (
        <>
          <rect x="2.5" y="4.5" width="19" height="15" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M6.5 4.5v15M17.5 4.5v15M2.5 9.5h4M17.5 9.5h4M2.5 14.5h4M17.5 14.5h4" stroke="currentColor" strokeWidth="2" />
          <path d="M10.2 9.2L15 12l-4.8 2.8V9.2Z" fill="currentColor" />
        </>
      )}
      {name === 'digital' && (
        <>
          <rect x="2.5" y="3.5" width="17" height="13" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M2.5 8h17" stroke="currentColor" strokeWidth="2.2" />
          <path d="M13 11.5l8 3.2-3.4 1.4-1.4 3.4-3.2-8Z" fill="var(--bg)" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        </>
      )}
      {name === 'print' && (
        <>
          <rect x="3" y="4" width="14" height="6.5" rx="1" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M17 7.25h3v5.25h-9V15" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <rect x="9" y="15" width="4" height="6" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
        </>
      )}
      {name === 'pointing-hand' && (
        <>
          <path
            d="M3 11.5h5.5V9.2c0-1 .8-1.7 1.8-1.7h9.2c1.1 0 1.8.8 1.8 1.8s-.7 1.7-1.8 1.7H14v1.8h2.2c.9 0 1.5.7 1.5 1.5s-.6 1.5-1.5 1.5H13.5v1.6h1.2c.8 0 1.4.6 1.4 1.3 0 .8-.6 1.3-1.4 1.3H8.5C5.6 20 3 18.2 3 15.2v-3.7Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </>
      )}
      {name === 'arrow' && (
        <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {name === 'mail' && (
        <>
          <rect x="2.5" y="5" width="19" height="14" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
        </>
      )}
      {name === 'phone' && (
        <path
          d="M6.5 3.5h3.2l1.4 4.2-2.1 1.7a12.5 12.5 0 0 0 5.6 5.6l1.7-2.1 4.2 1.4v3.2c0 1.2-1 2.2-2.3 2-7.8-.9-13.9-7-14.8-14.8-.1-1.2.9-2.2 2.1-2.2Z"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
      )}
      {name === 'pin' && (
        <>
          <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0c0 5 6.5 11 6.5 11Z" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="2.4" fill="currentColor" />
        </>
      )}
      {name === 'starburst' && (
        <path
          d="M12 1.5l2.3 6.2 6.5-1.5-4.1 5.2 5.4 4-6.6.8.7 6.3-4.2-5-4.2 5 .7-6.3-6.6-.8 5.4-4-4.1-5.2 6.5 1.5L12 1.5Z"
          fill="currentColor"
        />
      )}
      {name === 'menu' && (
        <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
      )}
    </svg>
  );
}
