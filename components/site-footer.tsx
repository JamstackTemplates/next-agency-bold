import { availabilityHeadline, business } from '../content/business';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

const FOOTER_NAV = [
  { href: '/', label: 'Home' },
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/process/', label: 'Process' },
  { href: '/contact/', label: 'Contact' },
] as const;

/**
 * The end of the hoarding: one last bill pasted on the plywood with the studio's details,
 * and LOUD HANDS sprayed huge across the boards, cropped by the pavement.
 */
export function SiteFooter() {
  const dialHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="texture-plywood tear-top relative -mt-2 overflow-hidden pt-16 sm:pt-20">
      <div className="wrap relative z-10 grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* The bill */}
        <div className="pasted relative lg:col-span-7 lg:-rotate-[0.8deg]">
          <div className="texture-surface tear-both relative px-6 pt-8 pb-9 text-ink sm:px-10 sm:pt-10 sm:pb-11">
            <span className="paste-wrinkle absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow text-primary-ink">Stevenson Square · Est. {business.foundedYear}</p>
              <p className="mt-3 font-display text-[clamp(2.4rem,5vw,3.6rem)] uppercase leading-[0.9]">{business.name}</p>

              <address className="mt-6 grid gap-x-8 gap-y-4 not-italic sm:grid-cols-2">
                <p className="flex items-start gap-2.5 text-base leading-snug">
                  <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-primary-ink" />
                  <span>{business.address.formatted}</span>
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2.5">
                    <Icon name="mail" className="size-5 shrink-0 text-primary-ink" />
                    <a className="text-link font-mono text-[0.95rem] wrap-anywhere" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Icon name="phone" className="size-5 shrink-0 text-primary-ink" />
                    <a className="text-link font-mono text-[0.95rem]" href={dialHref}>
                      {business.phoneDisplay}
                    </a>
                  </p>
                </div>
              </address>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t-2 border-dashed border-rule/40 pt-4 font-mono text-xs font-bold uppercase tracking-[0.1em]">
                <span className="text-muted">{business.hoursSummary}</span>
                <span className="bg-yellow px-2 py-0.5 text-[#111111]">{availabilityHeadline(business.availability.nextStart)}</span>
              </div>
            </div>
          </div>
          <span className="masking-tape -top-2 left-8 rotate-[-4deg]" />
          <span className="masking-tape -top-3 right-10 rotate-[6deg]" />
        </div>

        {/* Navigation stencilled on the boards */}
        <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-9 lg:pt-6">
          <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-1 p-0 sm:grid-cols-3 lg:grid-cols-1">
            {FOOTER_NAV.map(item => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  className="sprayed inline-flex min-h-11 items-center text-[2.1rem] leading-none no-underline decoration-primary decoration-4 underline-offset-[0.12em] hover:underline sm:text-[2.4rem]"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs text-ink/80">
            © {business.name} · Gallery sample · made with{' '}
            <a className="font-bold text-ink underline hover:text-primary-ink" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </p>
        </nav>
      </div>

      {/* LOUD HANDS sprayed across the boards, cropped at the pavement */}
      <div aria-hidden="true" className="print-hide pointer-events-none mt-12 select-none overflow-hidden sm:mt-16">
        <p className="sprayed -mb-[0.2em] whitespace-nowrap text-center text-[clamp(4rem,19.5vw,20rem)] leading-[0.8] tracking-[-0.01em] opacity-90">
          {business.wordmark}
        </p>
      </div>
    </footer>
  );
}
