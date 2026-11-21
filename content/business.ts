import type { OpeningHours } from '../lib/hours.ts';

export interface StudioAddress {
  /** Street and floor line. */
  street: string;
  /** City or town. */
  locality: string;
  /** UK postcode. */
  postalCode: string;
  /** Country display name. */
  country: string;
  /** ISO 3166-1 alpha-2 country code for structured data. */
  countryCode: string;
  /** Nearby public landmark for visitors. */
  landmark: string;
  /** Full single-line postal address. */
  formatted: string;
  /** Query string passed to Google Maps helpers. */
  mapQuery: string;
}

export interface StudioAvailability {
  /**
   * Next available project start month in YYYY-MM format (e.g. "2027-02").
   * Most frequent owner edit — updates the hero sticker and Process FAQ automatically.
   */
  nextStart: string;
  /** Optional short availability note shown alongside the start month. */
  note?: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Stacked wordmark text used in the tape header and footer poster. */
  wordmark: string;
  /** Short lead claim for the home page hero. */
  tagline: string;
  /** Plain-text introduction used as fallback metadata and studio summary. */
  introduction: string;
  /** Public contact email address, always visible on Contact and footer. */
  email: string;
  /** Dialable international phone number (Ofcom drama range for gallery sample). */
  phone: string;
  /** Human-readable local UK phone number. */
  phoneDisplay: string;
  /** Year the studio was founded. */
  foundedYear: number;
  /** Studio address in Manchester's Northern Quarter. */
  address: StudioAddress;
  /** Weekly studio hours (visits by appointment only). Seven records, Monday–Sunday. */
  hours: readonly OpeningHours[];
  /** Concise single-line hours summary for footer and compact contexts. */
  hoursSummary: string;
  /** Current booking window for new projects. */
  availability: StudioAvailability;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Enquiry-only notice; never implies a booking, quote or start date is confirmed. */
    introduction: string;
    /** Checklist of suggestions for the message body, not extra form inputs. */
    usefulToInclude: readonly string[];
  };
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const NEXT_START_PATTERN = /^(\d{4})-(\d{2})$/;

/** Validate YYYY-MM availability string with actionable error messages. */
export function validateAvailability(availability: StudioAvailability): void {
  const value = availability.nextStart.trim();
  const match = NEXT_START_PATTERN.exec(value);
  if (!match) {
    throw new Error(`business.availability.nextStart: expected YYYY-MM format, got "${availability.nextStart}"`);
  }
  const month = Number(match[2]);
  if (month < 1 || month > 12) {
    throw new Error(`business.availability.nextStart: month must be 01–12, got "${availability.nextStart}"`);
  }
  if (availability.note !== undefined && !availability.note.trim()) {
    throw new Error('business.availability.note: remove or provide non-empty text');
  }
}

/** Format "2027-02" as "February 2027". */
export function formatNextStart(nextStart: string): string {
  const match = NEXT_START_PATTERN.exec(nextStart.trim());
  if (!match) throw new Error(`business.availability.nextStart: invalid YYYY-MM "${nextStart}"`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) throw new Error(`business.availability.nextStart: invalid month in "${nextStart}"`);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

/** Render the standard availability sentence used on Home and Process. */
export function availabilityHeadline(nextStart: string): string {
  return `Taking new projects from ${formatNextStart(nextStart)}`;
}

export const business: Business = {
  name: 'Loud Hands Studio',
  wordmark: 'LOUD HANDS',
  tagline: 'Make it loud.',
  introduction: 'Brands, campaigns, motion and websites for people with something to say, made on Stevenson Square since 2014.',
  email: 'hello@loudhands.studio',
  phone: '+44 161 496 0472',
  phoneDisplay: '0161 496 0472',
  foundedYear: 2014,
  address: {
    street: 'First floor, 14 Stevenson Square',
    locality: 'Manchester',
    postalCode: 'M1 1FB',
    country: 'United Kingdom',
    countryCode: 'GB',
    landmark: 'Stevenson Square, Northern Quarter',
    formatted: 'First floor, 14 Stevenson Square, Manchester M1 1FB, United Kingdom',
    mapQuery: '14 Stevenson Square, Manchester M1 1FB, United Kingdom',
  },
  hours: [
    { day: 'Monday', opens: '09:30', closes: '18:00' },
    { day: 'Tuesday', opens: '09:30', closes: '18:00' },
    { day: 'Wednesday', opens: '09:30', closes: '18:00' },
    { day: 'Thursday', opens: '09:30', closes: '18:00' },
    { day: 'Friday', opens: '09:30', closes: '18:00' },
    { day: 'Saturday' },
    { day: 'Sunday' },
  ],
  hoursSummary: 'Mon–Fri 09:30–18:00 (visits by appointment)',
  availability: {
    nextStart: '2027-02',
    note: 'Two project slots open for spring.',
  },
  enquiries: {
    title: 'Say it loud.',
    introduction: "Send an enquiry. We'll reply to arrange a first call; nothing is booked until we've both agreed a proposal.",
    usefulToInclude: [
      "What you're launching or changing, in a sentence",
      'Which services you think you need (or just the problem)',
      'Your rough budget range and any fixed launch date',
      "Your organisation's name and website",
      'How you heard about us',
    ],
  },
};
