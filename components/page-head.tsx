import type { ReactNode } from 'react';
import { PaperTag } from './art/paper-tag';

export type PageHeadColour = 'yellow' | 'blue' | 'ink' | 'red';

const THEME_STYLES: Record<
  PageHeadColour,
  { poster: string; heading: string; lede: string; tag: 'ink' | 'yellow' | 'red' | 'paper' }
> = {
  yellow: {
    poster: 'texture-yellow-band',
    heading: 'text-[#111111] [text-shadow:0.045em_0.04em_0_#C8301B]',
    lede: 'text-[#111111]',
    tag: 'ink',
  },
  blue: {
    poster: 'texture-blue-band',
    heading: 'text-[#FFFFFF] [text-shadow:0.045em_0.04em_0_#111111]',
    lede: 'text-[#FFFFFF]',
    tag: 'yellow',
  },
  ink: {
    poster: 'texture-ink-band',
    heading: 'text-[#F3EEE2] [text-shadow:0.045em_0.04em_0_#C8301B]',
    lede: 'text-[#F3EEE2]',
    tag: 'yellow',
  },
  red: {
    poster: 'texture-red-band',
    heading: 'text-[#FFFFFF] [text-shadow:0.045em_0.04em_0_#2338E8]',
    lede: 'text-[#FFFFFF]',
    tag: 'yellow',
  },
};

/**
 * Inner-page head: one big torn bill pasted on the newsprint wall, a different colour per page
 * (Work yellow, Services blue, Process ink, Contact red), with page-specific art on the right.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  colour = 'yellow',
  art,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  colour?: PageHeadColour;
  art?: ReactNode;
}) {
  const styles = THEME_STYLES[colour];

  return (
    <header className="texture-paper texture-halftone relative overflow-x-clip pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="wrap relative">
        <div className="pasted relative -rotate-[0.7deg]">
          <div className={`tear-both relative overflow-hidden px-6 pt-10 pb-12 sm:px-10 sm:pt-14 sm:pb-16 lg:px-14 ${styles.poster}`}>
            <span className="paste-wrinkle absolute inset-0" aria-hidden="true" />
            <div className={`relative grid items-center gap-8 ${art ? 'lg:grid-cols-[1fr_auto]' : ''}`}>
              <div className="min-w-0">
                <PaperTag tone={styles.tag} rotate={-1.5}>
                  {eyebrow}
                </PaperTag>
                <h1
                  id={id}
                  className={`mt-5 font-display text-[clamp(3.9rem,12.5vw,10rem)] uppercase leading-[0.84] tracking-[-0.01em] text-balance ${styles.heading}`}
                >
                  {title}
                </h1>
                {children ? (
                  <div className={`mt-6 max-w-2xl text-lg font-medium leading-relaxed sm:text-xl ${styles.lede}`}>{children}</div>
                ) : null}
              </div>
              {art ? <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:mr-2 lg:w-[22rem] lg:max-w-none">{art}</div> : null}
            </div>
          </div>
        </div>
        <span aria-hidden="true" className="masking-tape -top-3 left-[12%] rotate-[-5deg]" />
        <span aria-hidden="true" className="masking-tape -top-2 right-[10%] rotate-[4deg]" />
      </div>
    </header>
  );
}
