import type { CSSProperties, ReactNode } from 'react';
import { business } from '../content/business';
import { formatStepWeeks, TIMELINE_WEEKS, type ProcessStep } from '../content/process';
import {
  AVAILABILITY_LABELS,
  formatFromFee,
  formatServiceWeeks,
  formatSpecimenNumber,
  type ServiceAvailability,
  type StudioService,
} from '../content/services';
import { mapDirectionsUrl } from '../lib/maps';
import { CopyEmail } from './copy-email';
import { GoogleMap } from './google-map';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';
import { Icon } from './art/icons';
import { PaperTag } from './art/paper-tag';
import { PasteUpWall } from './art/paste-up-wall';
import { ShhHand } from './art/shh-hand';

type ContentProps = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* WORK: SECTORS — a long run of words, like the bottom line of a gig bill     */
/* -------------------------------------------------------------------------- */

export function SectorsBand({
  heading,
  sectors,
}: {
  heading: string;
  sectors: readonly string[];
}) {
  return (
    <section aria-labelledby="sectors-heading" className="texture-paper py-20 sm:py-28">
      <div className="wrap">
        <h2 id="sectors-heading" className="eyebrow text-primary-ink">
          {heading}
        </h2>
        <ul className="mt-6 flex list-none flex-wrap items-center gap-x-5 gap-y-1 p-0 font-display text-[clamp(2.4rem,6.5vw,5.5rem)] uppercase leading-[1.02]">
          {sectors.map((sector, index) => (
            <li key={sector} className="inline-flex items-center gap-5">
              <span className={index % 2 ? 'specimen-numeral' : 'text-ink'}>{sector}</span>
              {index < sectors.length - 1 ? <Icon name="starburst" className="size-7 text-primary sm:size-9" /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SERVICES: SPECIMEN SHEETS                                                   */
/* -------------------------------------------------------------------------- */

const STAMP_STYLES: Record<ServiceAvailability, string> = {
  open: 'text-blue',
  limited: 'text-primary-ink',
  waitlist: 'text-ink',
};

export function ServiceSpecimens({ services }: { services: readonly StudioService[] }) {
  return (
    <section aria-label="Services list" className="texture-paper pt-6 pb-20 sm:pb-28">
      <div className="wrap">
        <ol className="list-none border-t-4 border-rule p-0">
          {services.map(service => (
            <li key={service.id} id={service.id} className="scroll-reveal scroll-mt-28 border-b-2 border-rule py-10 sm:py-14">
              <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[8rem_1fr_19rem]">
                <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-start lg:justify-start lg:gap-6">
                  <span className="specimen-numeral text-[5rem] sm:text-[7rem]">{formatSpecimenNumber(service.number)}</span>
                  <span className={`rubber-stamp ${STAMP_STYLES[service.availability]}`}>
                    {AVAILABILITY_LABELS[service.availability]}
                  </span>
                </div>

                <div className="min-w-0">
                  <h2 className="font-display text-[clamp(2.7rem,6.5vw,5.75rem)] uppercase leading-[0.88] tracking-[-0.005em] text-ink">
                    {service.name}
                  </h2>
                  <p className="mt-4 text-xl font-semibold leading-snug text-ink sm:text-2xl">{service.pitch}</p>
                  <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm font-bold uppercase tracking-[0.08em] text-ink">
                    <span className="bg-yellow px-2.5 py-1 text-[#111111]">{formatFromFee(service.fromFee)}</span>
                    <span>{formatServiceWeeks(service.weeks)}</span>
                  </p>
                </div>

                <div className="lg:pt-3">
                  <h3 className="eyebrow text-muted">Typical deliverables</h3>
                  <ul className="mt-4 list-none space-y-2.5 p-0">
                    {service.deliverables.map(item => (
                      <li key={item} className="flex items-start gap-3 border-b border-rule/20 pb-2.5 text-base font-medium text-ink last:border-b-0">
                        <Icon name="pointing-hand" className="mt-0.5 size-5 shrink-0 text-primary-ink" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SERVICES: HOW WE PRICE — a bill on the hoarding                             */
/* -------------------------------------------------------------------------- */

function PricingPanelSection({ children }: ContentProps) {
  return (
    <PasteUpWall ariaLabelledBy="how-we-price-heading">
      <div className="pasted relative mx-auto max-w-5xl -rotate-[0.8deg]">
        <div className="texture-surface tear-both relative px-7 pt-12 pb-12 sm:px-12 sm:pt-14 sm:pb-14">
          <span className="paste-wrinkle absolute inset-0" aria-hidden="true" />
          <div className="relative">{children}</div>
        </div>
        <span className="masking-tape -top-3 left-10 rotate-[-6deg]" aria-hidden="true" />
        <span className="masking-tape -top-2 right-12 rotate-[5deg]" aria-hidden="true" />
      </div>
    </PasteUpWall>
  );
}

function PricingHeading({ children }: ContentProps) {
  return (
    <div>
      <p className="eyebrow text-primary-ink">Money, plainly</p>
      <h2 id="how-we-price-heading" className="mt-3 font-display text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.88] text-ink">
        {children}
      </h2>
    </div>
  );
}

function PricingPoints({ children }: ContentProps) {
  return <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0">{children}</dl>;
}

function PricingPoint({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="border-t-4 border-rule pt-4 sm:border-t-0 sm:border-l-2 sm:px-6 sm:pt-0 sm:first:border-l-0 sm:first:pl-0">
      <dt className="font-display text-[1.9rem] uppercase leading-[0.95] text-primary-ink">{term}</dt>
      <dd className="mt-3 text-base leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

function PricingNote({ children }: ContentProps) {
  return (
    <p className="mt-10 border-t-2 border-dashed border-rule/50 pt-5 font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.08em] text-muted">
      {children}
    </p>
  );
}

export const PricingPanel = Object.assign(PricingPanelSection, {
  Heading: PricingHeading,
  Points: PricingPoints,
  Point: PricingPoint,
  Note: PricingNote,
});

/* -------------------------------------------------------------------------- */
/* SERVICES: WHAT WE DON'T DO — struck through in red marker                   */
/* -------------------------------------------------------------------------- */

function DontDoSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="dont-do-heading" className="texture-paper texture-halftone py-20 sm:py-28">
      <div className="wrap">{children}</div>
    </section>
  );
}

function DontDoHeading({ children }: ContentProps) {
  return (
    <h2 id="dont-do-heading" className="eyebrow text-primary-ink">
      {children}
    </h2>
  );
}

function DontDoList({ children }: ContentProps) {
  return <ul className="mt-8 flex list-none flex-col gap-3 p-0">{children}</ul>;
}

function DontDoItem({ children }: ContentProps) {
  return (
    <li className="max-w-full even:self-end even:text-right">
      <span className="marker-strike font-display text-[clamp(2.4rem,7.5vw,6.25rem)] uppercase leading-[1.02] text-ink">
        {children}
      </span>
    </li>
  );
}

export const DontDoBand = Object.assign(DontDoSection, {
  Heading: DontDoHeading,
  List: DontDoList,
  Item: DontDoItem,
});

/* -------------------------------------------------------------------------- */
/* PROCESS: THE RUNNING ORDER                                                  */
/* -------------------------------------------------------------------------- */

export function RunningOrder({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <section aria-label="Project running order" className="texture-paper pt-6 pb-20 sm:pb-28">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-4 border-rule pb-3">
          <p className="eyebrow text-primary-ink">Tonight’s running order</p>
          <p className="eyebrow text-muted">Doors: week 1 · Curfew: week {TIMELINE_WEEKS}</p>
        </div>

        <ol className="list-none p-0">
          {steps.map(step => (
            <li key={step.id} id={step.id} className="scroll-reveal scroll-mt-28 border-b-2 border-rule py-10 sm:py-14">
              <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.8] text-primary [text-shadow:0.04em_0.035em_0_var(--blue)]">
                      {step.step}
                    </span>
                    <div className="min-w-0 pt-1">
                      <h2 className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] uppercase leading-[0.88] text-ink">{step.name}</h2>
                      <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.12em] text-primary-ink">{formatStepWeeks(step.weeks)}</p>
                    </div>
                  </div>
                  <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-ink sm:text-xl">{step.summary}</p>
                </div>

                <div className="grid gap-6 self-end sm:grid-cols-2 sm:gap-0">
                  <div className="sm:pr-6">
                    <h3 className="eyebrow text-primary-ink">You get</h3>
                    <ul className="mt-3 list-none space-y-2 p-0 text-base font-medium text-ink">
                      {step.youGet.map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Icon name="pointing-hand" className="mt-0.5 size-5 shrink-0 text-primary-ink" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t-2 border-rule/25 pt-5 sm:border-t-0 sm:border-l-2 sm:pt-0 sm:pl-6">
                    <h3 className="eyebrow text-muted">We need from you</h3>
                    <ul className="mt-3 list-none space-y-2 p-0 text-base font-medium text-ink">
                      {step.weNeed.map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Icon name="starburst" className="mt-1 size-4 shrink-0 text-ink" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const TAPE_COLOURS = [
  'bg-[#C8301B] text-[#FFFFFF]',
  'bg-[#FFD23F] text-[#111111]',
  'bg-[#2338E8] text-[#FFFFFF]',
  'bg-[#E9DFC2] text-[#111111]',
  'bg-[#C8301B] text-[#FFFFFF]',
];

const TAPE_CLIP = '[clip-path:polygon(0_8%,3%_0,97%_4%,100%_0,98%_50%,100%_100%,96%_94%,4%_100%,0_92%,2%_50%)]';

export function TimelineStrip({
  heading,
  steps,
}: {
  heading: string;
  steps: readonly ProcessStep[];
}) {
  const weeks = Array.from({ length: TIMELINE_WEEKS }, (_, i) => i + 1);

  return (
    <section aria-labelledby="timeline-heading" className="texture-ink-band tear-top relative -mt-2 py-20 sm:py-28">
      <div className="wrap">
        <p className="eyebrow text-yellow">Week by week</p>
        <h2 id="timeline-heading" className="mt-3 font-display text-[clamp(2.8rem,7vw,5.5rem)] uppercase leading-[0.88] text-[#F3EEE2]">
          {heading}
        </h2>

        <div className="mt-10">
          {/* Week columns */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[12rem_1fr] sm:gap-4">
            <span className="eyebrow hidden self-end text-[#B3AC9E] sm:block">Stage</span>
            <div className="grid grid-cols-12 border-b-2 border-[#F3EEE2]/30 pb-2" aria-hidden="true">
              {weeks.map(w => (
                <span key={w} className="text-center font-mono text-[10px] font-bold text-[#B3AC9E] sm:text-xs">
                  {w}
                </span>
              ))}
            </div>
          </div>

          <ol className="mt-2 list-none p-0">
            {steps.map((step, idx) => (
              <li key={step.id} className="grid grid-cols-1 gap-2 border-b border-[#F3EEE2]/10 py-3 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-4">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs font-bold text-yellow">0{step.step}</span>
                  <span className="font-display text-[1.5rem] uppercase leading-none text-[#F3EEE2] sm:text-[1.6rem]">{step.name}</span>
                </span>
                <div className="relative grid h-10 grid-cols-12 bg-[repeating-linear-gradient(90deg,rgba(243,238,226,0.08)_0_1px,transparent_1px_calc(100%/12))] sm:h-11">
                  <span
                    style={{ gridColumn: `${step.weeks.start} / ${step.weeks.end + 1}`, transform: `rotate(${idx % 2 ? 0.8 : -0.8}deg)` } as CSSProperties}
                    className={`flex items-center justify-center px-1 font-mono text-[10px] font-bold uppercase tracking-[0.06em] shadow-[0_6px_10px_-4px_rgba(0,0,0,0.7)] sm:px-2 sm:text-[11px] sm:tracking-[0.1em] ${TAPE_CLIP} ${TAPE_COLOURS[idx % TAPE_COLOURS.length]}`}
                  >
                    <span className="sr-only">{formatStepWeeks(step.weeks)}</span>
                    <span aria-hidden="true" className="truncate">
                      {step.weeks.start === step.weeks.end ? `W${step.weeks.start}` : `W${step.weeks.start}–${step.weeks.end}`}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PROCESS: FAQ — paper slips pinned to the board                              */
/* -------------------------------------------------------------------------- */

function FaqSection({ children }: ContentProps) {
  return (
    <PasteUpWall ariaLabelledBy="faq-heading" padding="py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">{children}</div>
    </PasteUpWall>
  );
}

function FaqHeading({ children }: ContentProps) {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <PaperTag tone="ink" rotate={-2}>
        Questions
      </PaperTag>
      <h2 id="faq-heading" className="sprayed mt-4 text-[clamp(3rem,7vw,5.75rem)] leading-[0.86]">
        {children}
      </h2>
    </div>
  );
}

function FaqList({ children }: ContentProps) {
  return <div className="space-y-6">{children}</div>;
}

function FaqItem({
  question,
  children,
  offset = false,
}: {
  question: string;
  children: ReactNode;
  offset?: boolean;
}) {
  return (
    <div className={`pasted relative ${offset ? 'rotate-[0.6deg] sm:ml-10' : '-rotate-[0.5deg] sm:mr-10'}`}>
      <details className="faq-slip texture-surface tear-bottom relative text-ink">
        <summary>
          <span aria-hidden="true" className="size-3.5 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ff7a62,#C8301B_60%,#7a1a0d)] shadow-[1px_2px_2px_rgba(0,0,0,0.45)]" />
          <span>{question}</span>
        </summary>
        <div className="px-6 pb-7 text-base leading-relaxed text-ink sm:pl-12">{children}</div>
      </details>
    </div>
  );
}

export const FaqSlips = Object.assign(FaqSection, {
  Heading: FaqHeading,
  List: FaqList,
  Item: FaqItem,
});

/* -------------------------------------------------------------------------- */
/* CONTACT: DIRECT LINES & VISIT THE STUDIO                                    */
/* -------------------------------------------------------------------------- */

export function DirectLinesBand({ heading }: { heading: string }) {
  const dialHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <section aria-labelledby="direct-lines-heading" className="texture-yellow-band tear-both relative py-16 text-[#111111] sm:py-20">
      <div className="wrap">
        <h2 id="direct-lines-heading" className="eyebrow">
          {heading}
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em]">Email · always open</p>
            <a
              href={`mailto:${business.email}`}
              className="mt-3 block font-mono text-[clamp(1.45rem,3.9vw,2.9rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#111111] underline decoration-[#C8301B] decoration-4 underline-offset-[0.18em] wrap-anywhere hover:decoration-[#111111]"
            >
              {business.email}
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CopyEmail email={business.email} />
            </div>
          </div>

          <div className="border-t-2 border-[#111111] pt-8 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em]">Studio line</p>
            <a
              href={dialHref}
              className="mt-2 block font-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.95] text-[#111111] underline decoration-[#C8301B] decoration-4 underline-offset-[0.12em] hover:decoration-[#111111]"
            >
              {business.phoneDisplay}
            </a>
            <p className="mt-4 text-base font-semibold">Answered Monday to Friday, 09:30–18:00 UK time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisitStudioPanel({
  heading,
  appointmentNote,
}: {
  heading: string;
  appointmentNote: string;
}) {
  return (
    <PasteUpWall ariaLabelledBy="visit-studio-heading">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div className="pasted relative -rotate-[0.6deg]">
          <div className="texture-surface tear-both relative px-6 pt-10 pb-10 text-ink sm:px-10">
            <span className="paste-wrinkle absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <PaperTag tone="red" rotate={-1.5}>
                Northern Quarter
              </PaperTag>
              <h2 id="visit-studio-heading" className="mt-4 font-display text-[clamp(3rem,6.5vw,5rem)] uppercase leading-[0.86]">
                {heading}
              </h2>
              <p className="mt-5 text-lg font-semibold leading-snug">{business.address.formatted}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{appointmentNote}</p>

              <div className="mt-6">
                <OpenBadge hours={business.hours} />
              </div>

              <table className="mt-6 w-full border-collapse font-mono text-sm">
                <caption className="sr-only">Studio hours (visits by appointment)</caption>
                <tbody>
                  {business.hours.map(row => (
                    <tr key={row.day} className="border-b border-dashed border-rule/30">
                      <th scope="row" className="py-2 pr-4 text-left font-bold">
                        {row.day}
                      </th>
                      <td className={`py-2 text-right ${row.opens && row.closes ? '' : 'text-muted'}`}>
                        {row.opens && row.closes ? `${row.opens}–${row.closes}` : 'Closed'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <TimeZoneNote className="mt-3 font-mono text-xs text-muted" />

              <div className="mt-6">
                <a
                  href={mapDirectionsUrl(business.address.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-ink text-sm"
                >
                  <Icon name="pin" className="size-4" />
                  <span>Directions to Stevenson Square</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* The map, taped up like a photo */}
        <figure className="pasted relative rotate-[1.2deg] lg:mt-10">
          <div className="bg-[#FFFDF7] p-3 pb-12">
            <GoogleMap
              address={business.address.mapQuery}
              title="Map of Loud Hands Studio, 14 Stevenson Square, Manchester M1 1FB"
              className="bg-[#E9E4D8]"
            />
            <figcaption className="marker absolute right-5 bottom-3 left-5 text-center text-2xl text-[#111111]">
              14 Stevenson Square · first floor
            </figcaption>
          </div>
          <span className="masking-tape -top-3 left-6 rotate-[-8deg]" aria-hidden="true" />
          <span className="masking-tape -top-3 right-6 rotate-[7deg]" aria-hidden="true" />
        </figure>
      </div>
    </PasteUpWall>
  );
}

/* -------------------------------------------------------------------------- */
/* 404                                                                         */
/* -------------------------------------------------------------------------- */

export function NotFoundPoster({
  heading,
  message,
  homeLabel,
  workLabel,
}: {
  heading: string;
  message: string;
  homeLabel: string;
  workLabel: string;
}) {
  return (
    <PasteUpWall padding="py-14 sm:py-24">
      <div className="pasted relative mx-auto max-w-6xl rotate-[-1deg]">
        <div className="texture-surface relative grid items-center gap-8 px-7 pt-12 pb-14 [clip-path:polygon(0_2%,30%_0,62%_3%,100%_0,100%_58%,96%_63%,99%_70%,93%_78%,97%_86%,90%_93%,93%_100%,0_100%)] sm:px-12 lg:grid-cols-[1.2fr_1fr]">
          <span className="paste-wrinkle absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <PaperTag tone="yellow" rotate={-2}>
              Error 404 · pasted over
            </PaperTag>
            <h1 className="display-overprint mt-5 text-[clamp(6rem,22vw,15rem)] leading-[0.82]">{heading}</h1>
            <p className="mt-6 max-w-lg text-xl font-semibold leading-snug text-ink sm:text-2xl">{message}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <SiteLink href="/" className="button">
                {homeLabel}
              </SiteLink>
              <SiteLink href="/work/" className="link-arrow text-ink">
                <span>{workLabel}</span>
                <Icon name="arrow" className="size-5" />
              </SiteLink>
            </div>
          </div>
          <div className="relative">
            <ShhHand className="mx-auto w-full max-w-md" />
          </div>
        </div>
      </div>
    </PasteUpWall>
  );
}
