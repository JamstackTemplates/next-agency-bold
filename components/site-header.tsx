'use client';

import { DarkModeToggle } from 'jamstacks';
import { useEffect, useRef } from 'react';
import { business } from '../content/business';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/process/', label: 'Process' },
] as const;

export function SiteHeader() {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close native popover on route change / link click in mobile menu
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const closeOnLink = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('a') && typeof el.hidePopover === 'function') {
        try {
          el.hidePopover();
        } catch {
          // Ignore if already closed
        }
      }
    };
    el.addEventListener('click', closeOnLink);
    return () => el.removeEventListener('click', closeOnLink);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-tape text-tape-ink shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)] [background-image:linear-gradient(180deg,rgba(255,255,255,0.06),transparent_40%)]">
      <div className="wrap flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-[4.5rem]">
        <SiteLink
          href="/"
          aria-label={`${business.name} — home`}
          className="group flex items-center gap-2.5 text-yellow no-underline hover:no-underline"
        >
          <svg aria-hidden="true" viewBox="0 0 40 40" className="size-9 shrink-0 transition-transform duration-200 group-hover:-rotate-12 sm:size-10">
            <circle cx="20" cy="20" r="19" fill="#FFD23F" />
            <path d="M8 16 L24 9 L24 31 L8 24 Z" fill="#C8301B" stroke="#111" strokeWidth="2.2" strokeLinejoin="round" />
            <rect x="24" y="15" width="7" height="10" fill="#FFFDF7" stroke="#111" strokeWidth="2.2" />
            <rect x="24" y="24" width="7" height="9" rx="3" fill="#FFFDF7" stroke="#111" strokeWidth="2.2" />
          </svg>
          <span className="font-display text-[1.7rem] uppercase leading-none tracking-[0.01em] sm:text-[2rem]">
            {business.wordmark}
          </span>
        </SiteLink>

        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-5">
          {/* Wide inline navigation */}
          <ul className="hidden list-none items-center gap-7 p-0 md:flex">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <SiteLink href={item.href} markCurrent="page" className="nav-link-tape text-sm uppercase tracking-wider">
                  {item.label}
                </SiteLink>
              </li>
            ))}
            <li>
              <SiteLink
                href="/contact/"
                markCurrent="page"
                className="inline-flex min-h-11 items-center justify-center bg-primary px-5 py-2 font-sans text-sm font-extrabold uppercase tracking-[0.06em] text-on-primary no-underline shadow-[3px_3px_0_var(--blue)] transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary-hover hover:no-underline hover:shadow-[5px_5px_0_var(--blue)] aria-[current=page]:bg-yellow aria-[current=page]:text-[#111111]"
              >
                Contact
              </SiteLink>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <DarkModeToggle />

            {/* Narrow popover navigation trigger (native Popover API) */}
            <button
              type="button"
              className="site-menu-trigger inline-flex min-h-11 items-center gap-2 bg-yellow px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#111111] md:hidden"
              popoverTarget="site-menu"
              popoverTargetAction="toggle"
              aria-controls="site-menu"
            >
              <Icon name="menu" className="size-4" />
              <span>Menu</span>
            </button>
          </div>

          <div
            ref={menuRef}
            id="site-menu"
            popover="auto"
            className="site-menu-popover md:hidden"
          >
            <ul className="flex list-none flex-col gap-2 p-0">
              <li>
                <SiteLink href="/" markCurrent="page" className="nav-link-tape block py-2 font-display text-2xl uppercase tracking-wide">
                  Home
                </SiteLink>
              </li>
              {NAV_ITEMS.map(item => (
                <li key={item.href}>
                  <SiteLink href={item.href} markCurrent="page" className="nav-link-tape block py-2 font-display text-2xl uppercase tracking-wide">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-[#F3EEE2]/25">
                <SiteLink
                  href="/contact/"
                  markCurrent="page"
                  className="flex min-h-12 w-full items-center justify-center bg-primary px-4 py-2 font-sans text-base font-extrabold uppercase tracking-wide text-on-primary no-underline shadow-[3px_3px_0_var(--blue)]"
                >
                  Contact
                </SiteLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
