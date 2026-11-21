import type { CSSProperties, ReactNode } from 'react';
import { availabilityHeadline, business } from '../content/business';
import { processSteps } from '../content/process';
import type { Project } from '../content/projects';
import { formatFromFee, formatServiceWeeks, formatSpecimenNumber, type StudioService } from '../content/services';
import { asset } from '../lib/paths';
import { AvailabilitySticker } from './art/availability-sticker';
import { Icon } from './art/icons';
import { MixingDesk } from './art/mixing-desk';
import { PaperTag } from './art/paper-tag';
import { PasteUpWall } from './art/paste-up-wall';
import { PosterArt } from './art/poster-art';
import { PosterCaption } from './poster-caption';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* 1. HERO — live type and studio status over the megaphone paste-up.          */
/* -------------------------------------------------------------------------- */

const heroArtwork = {
  '--hero-light-image': `url("${asset('/agency-light.webp')}")`,
  '--hero-dark-image': `url("${asset('/agency-dark.webp')}")`,
} as CSSProperties;

function HeroSection({ children }: ContentProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="texture-paper relative isolate overflow-hidden [--hs:clamp(5rem,27vw,9rem)] sm:[--hs:clamp(8rem,22vw,12rem)] lg:aspect-[43/24] lg:[--hs:clamp(9rem,min(calc(19vw-1.25rem),calc((100svh-13rem)/2.75)),17.5rem)]"
    >
      <div className="wrap relative pt-6 sm:pt-10 lg:grid lg:grid-cols-[calc(var(--hs)*0.88)_1fr] lg:grid-rows-[auto_auto_auto]">
        {children}
      </div>
      <AvailabilitySticker
        headline={availabilityHeadline(business.availability.nextStart)}
        note={business.availability.note}
        className="absolute top-[calc(1.5rem+var(--hs)*0.95)] right-3 max-sm:size-[clamp(6.75rem,30vw,9rem)] max-sm:p-2.5 max-sm:[&>span:first-of-type]:sr-only max-sm:[&>span:nth-of-type(2)]:text-sm sm:top-[calc(2.5rem+var(--hs)*0.95)] sm:right-auto sm:left-[calc(1.25rem+var(--hs)*2.35)] lg:top-[73.3%] lg:left-[43.6%] lg:h-[16.4%] lg:w-[13.4%] lg:rotate-0 lg:px-2 lg:py-1 lg:[filter:none] lg:[&>svg]:hidden lg:[&>span:nth-of-type(2)]:text-[clamp(0.95rem,1.4vw,1.4rem)]"
      />
      <div
        aria-hidden="true"
        className="hero-art print-hide pointer-events-none mt-5 ml-auto aspect-[1.15] w-full max-w-xl lg:absolute lg:inset-0 lg:-z-10 lg:mt-0 lg:aspect-auto lg:max-w-none"
        style={heroArtwork}
      />
    </section>
  );
}

function HeroHeading({ lines }: { lines: readonly [string, string, string] }) {
  return (
    <h1
      id="hero-heading"
      className="font-display text-[length:var(--hs)] uppercase leading-[0.9] tracking-[-0.01em] lg:col-span-2 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:grid lg:grid-rows-subgrid lg:items-start"
      aria-label={lines.join(' ')}
    >
      {lines.map((line, index) => (
        <span
          key={line}
          aria-hidden="true"
          data-text={line}
          className={`overprint w-fit${index < 2 ? ' max-lg:inline-block' : ''}${index === 0 ? ' max-lg:mr-[0.13em]' : ''}`}
        >
          <span>{line}</span>
        </span>
      ))}
    </h1>
  );
}

/** On wide screens the panel sits in the gap beside the short middle line ("IT"). */
function HeroPanel({ children }: ContentProps) {
  return (
    <div className="relative z-10 mt-6 max-w-md sm:mt-8 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:w-[min(27rem,33vw)] lg:self-center lg:py-2">
      {children}
    </div>
  );
}

function HeroSupporting({ children }: ContentProps) {
  return (
    <p className="text-lg font-semibold leading-snug text-ink sm:text-xl lg:text-[clamp(1rem,calc(var(--hs)*0.09),1.3rem)]">
      {children}
    </p>
  );
}

function HeroActions({ children }: ContentProps) {
  return <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-6 lg:mt-[clamp(0.75rem,calc(var(--hs)*0.08),1.5rem)] lg:gap-x-3 lg:gap-y-1">{children}</div>;
}

function HeroPrimaryAction({ children }: ContentProps) {
  return (
    <SiteLink href="/contact/" className="button text-[1.05rem] lg:px-4 lg:text-[clamp(0.875rem,calc(var(--hs)*0.075),1.05rem)]">
      <span>{children}</span>
      <Icon name="arrow" className="size-5" />
    </SiteLink>
  );
}

function HeroSecondaryAction({ children }: ContentProps) {
  return (
    <SiteLink href="/work/" className="link-arrow text-[1.05rem] text-ink lg:text-[clamp(0.875rem,calc(var(--hs)*0.075),1.05rem)]">
      <span>{children}</span>
      <Icon name="arrow" className="size-5" />
    </SiteLink>
  );
}

export const Hero = Object.assign(HeroSection, {
  Heading: HeroHeading,
  Panel: HeroPanel,
  Supporting: HeroSupporting,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
});

/* -------------------------------------------------------------------------- */
/* 3. SELECTED WORK — four posters pasted on the hoarding                      */
/* -------------------------------------------------------------------------- */

const FEATURED_TILTS = [-2.6, 1.8, -1.2, 2.8];
const FEATURED_DROP = ['lg:mt-6', 'lg:mt-20', 'lg:mt-0', 'lg:mt-14'];

function SelectedWorkSection({
  projects,
  children,
}: {
  projects: readonly Project[];
  children: ReactNode;
}) {
  return (
    <PasteUpWall ariaLabelledBy="selected-work-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">{children}</div>

      <ol className="grid list-none grid-cols-2 gap-x-4 gap-y-10 p-0 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-2">
        {projects.map((project, index) => (
          <li
            key={project.id}
            style={{ '--poster-tilt': `${FEATURED_TILTS[index % FEATURED_TILTS.length]}deg` } as CSSProperties}
            className={`poster-card scroll-reveal ${FEATURED_DROP[index % FEATURED_DROP.length]}`}
          >
            <SiteLink
              href={`/work/#${project.id}`}
              className="block text-ink no-underline hover:no-underline focus-visible:outline-offset-8"
              aria-label={`${project.title} — ${project.client}, ${project.year}`}
            >
              <PosterArt
                colour={project.poster.colour}
                motif={project.poster.motif}
                title={project.title}
                client={project.client}
                year={project.year}
                compact
                headingLevel="p"
              />
              <PosterCaption project={project} />
            </SiteLink>
          </li>
        ))}
      </ol>
    </PasteUpWall>
  );
}

function SelectedWorkHeading({ children }: ContentProps) {
  return (
    <div>
      <PaperTag tone="yellow" rotate={-2}>
        Selected work · 4 of the wall
      </PaperTag>
      <h2
        id="selected-work-heading"
        className="sprayed mt-4 text-[clamp(3.6rem,10vw,8rem)] leading-[0.84]"
      >
        {children}
      </h2>
    </div>
  );
}

function SelectedWorkLink({ children }: ContentProps) {
  return (
    <SiteLink href="/work/" className="button button-ink">
      <span>{children}</span>
      <Icon name="arrow" className="size-5" />
    </SiteLink>
  );
}

export const SelectedWork = Object.assign(SelectedWorkSection, {
  Heading: SelectedWorkHeading,
  Link: SelectedWorkLink,
});

/* -------------------------------------------------------------------------- */
/* 4. SERVICES — a type-specimen sheet, one huge line per service              */
/* -------------------------------------------------------------------------- */

function ServicesListSection({
  services,
  children,
}: {
  services: readonly StudioService[];
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="home-services-heading" className="texture-paper pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="wrap">
        <div className="mb-10 grid items-end gap-6 sm:mb-14 lg:grid-cols-12">{children}</div>

        <ol className="list-none border-t-4 border-rule p-0">
          {services.map(service => (
            <li key={service.id} className="scroll-reveal border-b-2 border-rule">
              <SiteLink
                href={`/services/#${service.id}`}
                className="group relative grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 px-1 py-5 text-ink no-underline transition-colors duration-150 hover:bg-primary hover:text-on-primary hover:no-underline focus-visible:bg-primary focus-visible:text-on-primary sm:gap-x-8 sm:px-4 sm:py-6 lg:grid-cols-[7rem_1fr_auto_3rem]"
              >
                <span className="specimen-numeral row-span-2 self-start text-[3.25rem] group-hover:[-webkit-text-stroke-color:#FFFFFF] group-focus-visible:[-webkit-text-stroke-color:#FFFFFF] sm:text-[5rem] lg:row-span-1 lg:self-center">
                  {formatSpecimenNumber(service.number)}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[clamp(2rem,5.6vw,4.75rem)] uppercase leading-[0.9] tracking-[-0.005em]">
                    {service.name}
                  </span>
                  <span className="mt-1.5 block text-base font-medium sm:text-lg">{service.pitch}</span>
                </span>
                <span className="col-start-2 font-mono text-[0.8rem] font-bold uppercase tracking-[0.1em] lg:col-start-3 lg:text-right">
                  <span className="block text-[1.05rem] tracking-[0.04em]">{formatFromFee(service.fromFee)}</span>
                  <span className="block opacity-75">{formatServiceWeeks(service.weeks)}</span>
                </span>
                <Icon
                  name="pointing-hand"
                  className="hidden size-9 justify-self-end opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
                />
              </SiteLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServicesListHeading({ children }: ContentProps) {
  return (
    <div className="lg:col-span-9">
      <p className="eyebrow text-primary-ink">What we make · fees from</p>
      <h2
        id="home-services-heading"
        className="mt-3 font-display text-[clamp(3.25rem,9vw,7.5rem)] uppercase leading-[0.86] text-ink"
      >
        {children}
      </h2>
    </div>
  );
}

function ServicesListLink({ children }: ContentProps) {
  return (
    <div className="lg:col-span-3 lg:justify-self-end">
      <SiteLink href="/services/" className="link-arrow text-ink">
        <span>{children}</span>
        <Icon name="arrow" className="size-5" />
      </SiteLink>
    </div>
  );
}

export const ServicesList = Object.assign(ServicesListSection, {
  Heading: ServicesListHeading,
  Link: ServicesListLink,
});

/* -------------------------------------------------------------------------- */
/* 5. PROCESS TEASER — the running order as a mixing desk                     */
/* -------------------------------------------------------------------------- */

function ProcessTeaserSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="home-process-heading" className="texture-ink-band relative overflow-hidden py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">{children}</div>
        <div className="lg:col-span-8">
          <MixingDesk steps={processSteps} />
        </div>
      </div>
    </section>
  );
}

function ProcessTeaserHeading({ children }: ContentProps) {
  return (
    <>
      <p className="eyebrow text-yellow">Five steps · twelve weeks</p>
      <h2
        id="home-process-heading"
        className="mt-3 font-display text-[clamp(3.25rem,8vw,6.5rem)] uppercase leading-[0.86] text-[#F3EEE2]"
      >
        {children}
      </h2>
    </>
  );
}

function ProcessTeaserBody({ children }: ContentProps) {
  return <div className="mt-6">{children}</div>;
}

function ProcessTeaserText({ children }: ContentProps) {
  return <p className="max-w-sm text-lg leading-relaxed text-[#F3EEE2]/90">{children}</p>;
}

function ProcessTeaserLink({ children }: ContentProps) {
  return (
    <SiteLink href="/process/" className="button button-yellow mt-7">
      <span>{children}</span>
      <Icon name="arrow" className="size-5" />
    </SiteLink>
  );
}

export const ProcessTeaser = Object.assign(ProcessTeaserSection, {
  Heading: ProcessTeaserHeading,
  Body: ProcessTeaserBody,
  Text: ProcessTeaserText,
  Link: ProcessTeaserLink,
});

/* -------------------------------------------------------------------------- */
/* 6. STUDIO IN NUMBERS — highlighter-yellow band, numbers set like a bill    */
/* -------------------------------------------------------------------------- */

function StudioNumbersSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="studio-numbers-heading" className="texture-yellow-band relative overflow-hidden py-16 sm:py-24">
      <div className="wrap">{children}</div>
    </section>
  );
}

function StudioNumbersHeading({ children }: ContentProps) {
  return (
    <h2 id="studio-numbers-heading" className="eyebrow text-[#111111]">
      {children}
    </h2>
  );
}

function StudioNumbersGrid({ children }: ContentProps) {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 border-t-4 border-[#111111] pt-8 lg:grid-cols-4 lg:gap-x-0">
      {children}
    </dl>
  );
}

function StudioNumbersStat({
  value,
  label,
  stagger = false,
}: {
  value: string;
  label: string;
  stagger?: boolean;
}) {
  return (
    <div className={`flex flex-col-reverse lg:border-l-2 lg:border-[#111111] lg:px-6 lg:first:border-l-0 lg:first:pl-0 ${stagger ? 'lg:pt-14' : ''}`}>
      <dt className="mt-3 max-w-[12ch] font-mono text-sm font-bold uppercase leading-snug tracking-[0.08em] text-[#111111]">
        {label}
      </dt>
      <dd className="m-0 font-display text-[clamp(4.5rem,9.5vw,8.75rem)] uppercase leading-[0.8] text-[#111111] [text-shadow:0.04em_0.035em_0_#C8301B]">
        {value}
      </dd>
    </div>
  );
}

export const StudioNumbers = Object.assign(StudioNumbersSection, {
  Heading: StudioNumbersHeading,
  Grid: StudioNumbersGrid,
  Stat: StudioNumbersStat,
});

/* -------------------------------------------------------------------------- */
/* 7. CLIENT QUOTE — a red speech-bubble bill pasted at an angle               */
/* -------------------------------------------------------------------------- */

function ClientQuoteSection({ children }: ContentProps) {
  return (
    <section aria-label="Client testimonial" className="texture-paper texture-halftone relative py-20 sm:py-28">
      <div className="wrap">
        <figure className="relative mx-auto max-w-5xl -rotate-[1.4deg]">
          <div className="pasted">
            <div className="texture-red-band tear-both relative px-7 pt-16 pb-12 sm:px-14 sm:pt-20 sm:pb-16">
              <span className="paste-wrinkle absolute inset-0" aria-hidden="true" />
              <div className="relative z-10">{children}</div>
            </div>
            {/* Speech-bubble tail */}
            <svg aria-hidden="true" viewBox="0 0 80 50" className="art-decorative -mt-px ml-[14%] block h-12 w-20">
              <path d="M2 0 L72 0 L14 48 Z" fill="var(--primary)" />
            </svg>
          </div>
          {/* Cut-paper quote marks */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-14 left-4 select-none font-display text-[10rem] leading-none text-yellow [text-shadow:0.04em_0.04em_0_#2338E8] sm:-top-20 sm:left-10 sm:text-[14rem]"
          >
            “
          </span>
          <span className="masking-tape -top-3 right-[10%] rotate-[8deg]" />
        </figure>
      </div>
    </section>
  );
}

function ClientQuoteText({ children }: ContentProps) {
  return (
    <blockquote className="font-display text-[clamp(2.1rem,5.4vw,4.4rem)] uppercase leading-[0.98] tracking-[-0.005em] text-balance text-[#FFFFFF]">
      {children}
    </blockquote>
  );
}

function ClientQuoteAttribution({ children }: ContentProps) {
  return (
    <figcaption className="mt-8 flex flex-wrap items-center gap-3">
      <PaperTag tone="yellow" rotate={-1.5}>
        {children}
      </PaperTag>
    </figcaption>
  );
}

export const ClientQuote = Object.assign(ClientQuoteSection, {
  Text: ClientQuoteText,
  Attribution: ClientQuoteAttribution,
});
