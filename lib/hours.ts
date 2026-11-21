/** Weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

export interface StudioStatus {
  /** True when open, false when closed, null when neutral/fallback. */
  isOpen: boolean | null;
  /** Primary status badge phrase. */
  label: string;
  /** Secondary context such as closing time or next opening. */
  detail: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

function resolveStatus(hours: readonly OpeningHours[], timeZone: string, now: Date) {
  if (!timeZone) return null;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return null;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return null;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { open: true as const, closes: today.closes };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return { open: false as const, nextDay: offset === 0 ? 'today' : day, nextOpens: entry.opens };
    }
  }
  return { open: false as const, nextDay: null, nextOpens: null };
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  const result = resolveStatus(hours, timeZone, now);
  if (!result) return fallback;
  if (result.open) return `Open now · until ${result.closes}`;
  if (result.nextDay && result.nextOpens) return `Closed · opens ${result.nextDay} at ${result.nextOpens}`;
  return 'Closed · see opening hours';
}

/** Studio-specific open/closed copy for Loud Hands Contact page (static fallback stays neutral). */
export function studioOpeningStatus(hours: readonly OpeningHours[], timeZone: string, now = new Date()): StudioStatus {
  const neutral: StudioStatus = { isOpen: null, label: 'Studio hours, visits by appointment', detail: '' };
  const result = resolveStatus(hours, timeZone, now);
  if (!result) return neutral;
  if (result.open) {
    return { isOpen: true, label: 'In the studio now', detail: `until ${result.closes}` };
  }
  if (result.nextDay && result.nextOpens) {
    return { isOpen: false, label: 'Studio closed now', detail: `next in ${result.nextDay} at ${result.nextOpens}` };
  }
  return { isOpen: false, label: 'Studio closed now', detail: 'visits by appointment' };
}
