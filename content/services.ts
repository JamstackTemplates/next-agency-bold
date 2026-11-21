/** Allowed studio capacity statuses per service. */
export const AVAILABILITY_STATES = ['open', 'limited', 'waitlist'] as const;
export type ServiceAvailability = typeof AVAILABILITY_STATES[number];

export const AVAILABILITY_LABELS: Record<ServiceAvailability, string> = {
  open: 'Open',
  limited: 'Limited slots',
  waitlist: 'Waitlist',
};

export interface StudioService {
  /** Stable URL-safe ID, used as the anchor on /services/#<id>. */
  id: string;
  /** Consecutive display number (1–5), rendered as 01–05. */
  number: number;
  /** Service name, reused in structured data knowsAbout and makesOffer. */
  name: string;
  /** Single-line pitch shown on Home and Services. */
  pitch: string;
  /** Concrete outputs included (at least three). */
  deliverables: readonly string[];
  /** Typical project duration in weeks (1–52, min <= max). */
  weeks: { min: number; max: number };
  /** Minimum project fee in whole pounds GBP, excluding VAT. Most frequent owner edit alongside availability. */
  fromFee: number;
  /** Current slot availability. Most frequent owner edit alongside fromFee. */
  availability: ServiceAvailability;
}

export const services: readonly StudioService[] = [
  {
    id: 'brand-identity',
    number: 1,
    name: 'Brand identity',
    pitch: "A name, a look and a voice you can't mistake.",
    deliverables: [
      'Naming and strategy',
      'Logo and type system',
      'Colour and illustration toolkit',
      'Tone-of-voice guide',
      'Launch assets',
    ],
    weeks: { min: 6, max: 10 },
    fromFee: 18000,
    availability: 'open',
  },
  {
    id: 'campaigns',
    number: 2,
    name: 'Campaigns & launches',
    pitch: 'One big idea, everywhere at once.',
    deliverables: [
      'Campaign idea and line',
      'Out-of-home and fly-posters',
      'Social and paid assets',
      'Launch plan',
      '30-day volume check',
    ],
    weeks: { min: 8, max: 12 },
    fromFee: 24000,
    availability: 'limited',
  },
  {
    id: 'motion-social',
    number: 3,
    name: 'Motion & social',
    pitch: 'Things that move people to stop scrolling.',
    deliverables: [
      'Animated idents',
      'Short-form video edits',
      'Social templates',
      'Sound-on and sound-off cuts',
    ],
    weeks: { min: 3, max: 6 },
    fromFee: 9500,
    availability: 'open',
  },
  {
    id: 'websites',
    number: 4,
    name: 'Websites & digital',
    pitch: 'Sites as loud as the posters.',
    deliverables: [
      'Content and structure',
      'Design system',
      'Build and launch',
      'Accessibility review',
      'Analytics set-up',
    ],
    weeks: { min: 8, max: 14 },
    fromFee: 22000,
    availability: 'waitlist',
  },
  {
    id: 'print-packaging',
    number: 5,
    name: 'Print, packaging & posters',
    pitch: 'Ink, paper and a reason to pick it up.',
    deliverables: [
      'Packaging and labels',
      'Posters and signage',
      'Print production management',
      'Supplier sourcing',
    ],
    weeks: { min: 3, max: 8 },
    fromFee: 6000,
    availability: 'open',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const AVAILABILITY_SET = new Set<string>(AVAILABILITY_STATES);

/** Format a whole GBP amount, e.g. 18000 -> "£18,000". */
export function formatFee(pounds: number): string {
  return `£${Math.round(pounds).toLocaleString('en-GB')}`;
}

/** Format "from £18,000 + VAT". */
export function formatFromFee(pounds: number): string {
  return `from ${formatFee(pounds)} + VAT`;
}

/** Format service week range, e.g. "6–10 weeks". */
export function formatServiceWeeks(weeks: { min: number; max: number }): string {
  return weeks.min === weeks.max ? `${weeks.min} weeks` : `${weeks.min}–${weeks.max} weeks`;
}

/** Format padded specimen number, e.g. 1 -> "01". */
export function formatSpecimenNumber(num: number): string {
  return String(num).padStart(2, '0');
}

/** Validate the services collection with item-specific errors. */
export function validateServices(list: readonly StudioService[]): void {
  if (list.length === 0) throw new Error('services: must contain at least one service');
  const ids = new Set<string>();

  list.forEach((service, index) => {
    const label = `service "${service.id || service.name || `#${index + 1}`}"`;
    if (!URL_SAFE_ID.test(service.id)) {
      throw new Error(`${label}: id must be lowercase URL-safe kebab-case`);
    }
    if (ids.has(service.id)) {
      throw new Error(`${label}: duplicate id "${service.id}"`);
    }
    ids.add(service.id);

    const expectedNumber = index + 1;
    if (service.number !== expectedNumber) {
      throw new Error(`${label}: number must be consecutive from 1 (expected ${expectedNumber}, got ${service.number})`);
    }

    if (!service.name.trim()) throw new Error(`${label}: name is required`);
    if (!service.pitch.trim()) throw new Error(`${label}: pitch is required`);

    if (service.deliverables.length < 3) {
      throw new Error(`${label}: must list at least three deliverables`);
    }
    for (const item of service.deliverables) {
      if (!item.trim()) throw new Error(`${label}: deliverable cannot be empty`);
    }

    const { min, max } = service.weeks;
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || max > 52 || min > max) {
      throw new Error(`${label}: weeks (${min}–${max}) must be integers 1–52 with min <= max`);
    }

    if (!Number.isInteger(service.fromFee) || service.fromFee <= 0) {
      throw new Error(`${label}: fromFee must be a positive whole-pound integer, got ${service.fromFee}`);
    }

    if (!AVAILABILITY_SET.has(service.availability)) {
      throw new Error(`${label}: unknown availability "${service.availability}"`);
    }
  });
}
