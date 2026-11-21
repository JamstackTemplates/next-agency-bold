export interface ProcessStep {
  /** Stable URL-safe ID, used as the anchor on /process/#<id>. */
  id: string;
  /** Consecutive step number starting at 1. */
  step: number;
  /** Step name shown on the mixing desk and setlist poster. */
  name: string;
  /** Week span within a typical 12-week project (1 <= start <= end <= 12). */
  weeks: { start: number; end: number };
  /** One-sentence description of what happens in this stage. */
  summary: string;
  /** Tangible outputs the client receives. */
  youGet: readonly string[];
  /** What the studio needs from the client to keep pace. */
  weNeed: readonly string[];
}

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'listen',
    step: 1,
    name: 'Listen',
    weeks: { start: 1, end: 1 },
    summary: 'A half-day workshop with your team and a week of looking at your audience, rivals and street.',
    youGet: ['A one-page findings sheet'],
    weNeed: ['Two hours of your key people', 'Past materials and sales figures'],
  },
  {
    id: 'sharpen',
    step: 2,
    name: 'Sharpen',
    weeks: { start: 2, end: 3 },
    summary: 'We boil it down to one line you can shout, then test it on strangers. Two rounds included.',
    youGet: ['The proposition', 'Two creative routes'],
    weNeed: ['One decision-maker at both reviews'],
  },
  {
    id: 'make',
    step: 3,
    name: 'Make',
    weeks: { start: 3, end: 8 },
    summary: 'Identity, campaign, film or site, built in weekly show-and-tells, never a big reveal.',
    youGet: ['Weekly work-in-progress', 'A shared board'],
    weNeed: ['Feedback within three working days'],
  },
  {
    id: 'test-loud',
    step: 4,
    name: 'Test it out loud',
    weeks: { start: 7, end: 9 },
    summary: 'Posters on real walls, sites in real hands, edits from what we see.',
    youGet: ['A test report', 'The revised work'],
    weNeed: ['Access to a few real customers'],
  },
  {
    id: 'launch',
    step: 5,
    name: 'Launch & turn it up',
    weeks: { start: 9, end: 12 },
    summary: 'Roll-out, hand-over files and training, and a 30-day volume check after launch.',
    youGet: ['Final files and guidelines', 'A 30-minute training session'],
    weNeed: ['A launch date', 'Who owns it on your side'],
  },
];

export const TIMELINE_WEEKS = 12;

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Format step week range, e.g. "Week 1" or "Weeks 2–3". */
export function formatStepWeeks(weeks: { start: number; end: number }): string {
  return weeks.start === weeks.end ? `Week ${weeks.start}` : `Weeks ${weeks.start}–${weeks.end}`;
}

/** Validate the process steps collection with item-specific errors. */
export function validateProcessSteps(list: readonly ProcessStep[]): void {
  if (list.length === 0) throw new Error('processSteps: must contain at least one step');
  const ids = new Set<string>();
  let previousStart = 0;

  list.forEach((step, index) => {
    const label = `process step "${step.id || step.name || `#${index + 1}`}"`;
    if (!URL_SAFE_ID.test(step.id)) {
      throw new Error(`${label}: id must be lowercase URL-safe kebab-case`);
    }
    if (ids.has(step.id)) {
      throw new Error(`${label}: duplicate id "${step.id}"`);
    }
    ids.add(step.id);

    const expectedStep = index + 1;
    if (step.step !== expectedStep) {
      throw new Error(`${label}: step must be consecutive from 1 (expected ${expectedStep}, got ${step.step})`);
    }

    if (!step.name.trim()) throw new Error(`${label}: name is required`);
    if (!step.summary.trim()) throw new Error(`${label}: summary is required`);

    const { start, end } = step.weeks;
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end > TIMELINE_WEEKS || start > end) {
      throw new Error(`${label}: weeks (${start}–${end}) must be integers within 1–${TIMELINE_WEEKS} with start <= end`);
    }
    if (start < previousStart) {
      throw new Error(`${label}: start week ${start} must not precede previous step start week ${previousStart}`);
    }
    previousStart = start;

    if (step.youGet.length === 0 || step.youGet.some(item => !item.trim())) {
      throw new Error(`${label}: youGet must contain non-empty items`);
    }
    if (step.weNeed.length === 0 || step.weNeed.some(item => !item.trim())) {
      throw new Error(`${label}: weNeed must contain non-empty items`);
    }
  });
}
