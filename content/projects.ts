/** Allowed discipline keys for filtering on /work/ and poster tags. */
export const DISCIPLINES = ['brand', 'campaign', 'motion', 'digital', 'print'] as const;
export type Discipline = typeof DISCIPLINES[number];

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  brand: 'Brand',
  campaign: 'Campaign',
  motion: 'Motion',
  digital: 'Digital',
  print: 'Print',
};

/** Allowed poster paper/ink surfaces from the template palette. */
export const POSTER_COLOURS = ['red', 'yellow', 'blue', 'ink', 'paper'] as const;
export type PosterColour = typeof POSTER_COLOURS[number];

/** Allowed bespoke SVG poster motif artwork keys. */
export const POSTER_MOTIFS = [
  'sunburst-cup',
  'curtain-shout',
  'spinning-disc',
  'oar-stripes',
  'door-grid',
  'lantern-arrows',
  'chainring',
  'flame-label',
] as const;
export type PosterMotif = typeof POSTER_MOTIFS[number];

export interface Project {
  /** Stable URL-safe ID, used as the anchor on /work/#<id>. */
  id: string;
  /** Client name, also feeds the scrolling client marquee on Home. */
  client: string;
  /** Project title printed across the poster in Anton. */
  title: string;
  /** One or more discipline keys from DISCIPLINES. */
  disciplines: readonly Discipline[];
  /** Four-digit completion year (2014 to current year). */
  year: number;
  /** Short sector label; feeds the sectors band on /work/. */
  sector: string;
  /** One sentence describing what the client needed. */
  brief: string;
  /** One sentence describing the result (fictitious gallery sample figures). */
  outcome: string;
  /** Poster visual treatment on the paste-up wall. */
  poster: {
    colour: PosterColour;
    motif: PosterMotif;
  };
  /** Whether shown on the Home page wall (exactly four must be featured). */
  featured: boolean;
  /** Unique integer position on the wall (ascending). */
  order: number;
}

export const projects: readonly Project[] = [
  {
    id: 'nightjar-coffee',
    client: 'Nightjar Coffee Roasters',
    title: 'Wake the Street',
    disciplines: ['brand', 'print'],
    year: 2026,
    sector: 'Food & drink',
    brief: 'A new roastery needed a name on the street before its doors opened.',
    outcome: 'Opening-weekend queue round the corner and three wholesale accounts in six weeks.',
    poster: { colour: 'red', motif: 'sunburst-cup' },
    featured: true,
    order: 1,
  },
  {
    id: 'tin-shed-theatre',
    client: 'Tin Shed Theatre',
    title: 'Too Loud for the Library',
    disciplines: ['campaign', 'digital'],
    year: 2026,
    sector: 'Arts & culture',
    brief: 'Sell a season of new writing to people who think theatre is quiet.',
    outcome: 'First-time bookers up 38% on the previous season.',
    poster: { colour: 'yellow', motif: 'curtain-shout' },
    featured: true,
    order: 2,
  },
  {
    id: 'pellet-records',
    client: 'Pellet Records',
    title: 'Pressing Matters',
    disciplines: ['brand', 'motion'],
    year: 2025,
    sector: 'Music',
    brief: 'A vinyl label with fifteen years of releases and no consistent look.',
    outcome: 'A sleeve system and animated idents used across 22 releases so far.',
    poster: { colour: 'ink', motif: 'spinning-disc' },
    featured: true,
    order: 3,
  },
  {
    id: 'ancoats-rowing-club',
    client: 'Ancoats Rowing Club',
    title: 'Pull Together',
    disciplines: ['campaign', 'print'],
    year: 2025,
    sector: 'Sport & community',
    brief: 'Recruit adult beginners to a club most locals walked past.',
    outcome: 'Learn-to-row places sold out in nine days; membership up 41%.',
    poster: { colour: 'blue', motif: 'oar-stripes' },
    featured: false,
    order: 4,
  },
  {
    id: 'open-doors-housing',
    client: 'Open Doors Housing Co-op',
    title: 'Every Door Has a Story',
    disciplines: ['campaign', 'motion'],
    year: 2025,
    sector: 'Non-profit',
    brief: 'Explain co-operative housing without a leaflet nobody reads.',
    outcome: 'Twelve resident films with 180,000 views and two new co-ops formed.',
    poster: { colour: 'paper', motif: 'door-grid' },
    featured: false,
    order: 5,
  },
  {
    id: 'gilt-street-market',
    client: 'Gilt Street Night Market',
    title: 'Follow the Lanterns',
    disciplines: ['print', 'digital'],
    year: 2026,
    sector: 'Events',
    brief: 'Get 6,000 people through four streets after dark without getting lost.',
    outcome: 'Wayfinding, posters and a phone map used by 74% of visitors.',
    poster: { colour: 'blue', motif: 'lantern-arrows' },
    featured: false,
    order: 6,
  },
  {
    id: 'fieldwork-cycles',
    client: 'Fieldwork Cycles',
    title: 'Built for the Long Way Round',
    disciplines: ['digital', 'brand'],
    year: 2024,
    sector: 'Retail',
    brief: 'A touring-bike shop whose website looked like a spreadsheet.',
    outcome: 'Online enquiries for custom builds doubled within a quarter.',
    poster: { colour: 'yellow', motif: 'chainring' },
    featured: false,
    order: 7,
  },
  {
    id: 'marlow-hot-sauce',
    client: 'Marlow & Daughters',
    title: 'Handle With Heat',
    disciplines: ['print', 'brand'],
    year: 2024,
    sector: 'Food & drink',
    brief: 'Three sauces, one shelf, no budget for advertising.',
    outcome: 'Listed in 40 independent delis; the label became the advert.',
    poster: { colour: 'red', motif: 'flame-label' },
    featured: true,
    order: 8,
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DISCIPLINE_SET = new Set<string>(DISCIPLINES);
const COLOUR_SET = new Set<string>(POSTER_COLOURS);
const MOTIF_SET = new Set<string>(POSTER_MOTIFS);

/** Return projects sorted by ascending wall order. */
export function orderedProjects(list: readonly Project[] = projects): Project[] {
  return [...list].sort((a, b) => a.order - b.order);
}

/** Return the four featured projects for the Home paste-up wall, in order. */
export function featuredProjects(list: readonly Project[] = projects): Project[] {
  return orderedProjects(list).filter(project => project.featured);
}

/** Derive unique client names in wall order for the Home marquee. */
export function marqueeClients(list: readonly Project[] = projects): string[] {
  const seen = new Set<string>();
  const clients: string[] = [];
  for (const project of orderedProjects(list)) {
    if (!seen.has(project.client)) {
      seen.add(project.client);
      clients.push(project.client);
    }
  }
  return clients;
}

/** Derive unique sector names in wall order for the /work/ sectors band. */
export function projectSectors(list: readonly Project[] = projects): string[] {
  const seen = new Set<string>();
  const sectors: string[] = [];
  for (const project of orderedProjects(list)) {
    if (!seen.has(project.sector)) {
      seen.add(project.sector);
      sectors.push(project.sector);
    }
  }
  return sectors;
}

/** Filter projects by discipline key (or return all when unset/invalid). */
export function filterProjects(list: readonly Project[], discipline: Discipline | 'all'): Project[] {
  const sorted = orderedProjects(list);
  if (discipline === 'all') return sorted;
  return sorted.filter(project => project.disciplines.includes(discipline));
}

export function isDiscipline(value: string | null | undefined): value is Discipline {
  return typeof value === 'string' && DISCIPLINE_SET.has(value);
}

/** Validate the projects collection with item-specific errors. */
export function validateProjects(list: readonly Project[], currentYear = new Date().getFullYear()): void {
  if (list.length === 0) throw new Error('projects: must contain at least one project');
  const ids = new Set<string>();
  const orders = new Set<number>();
  let featuredCount = 0;

  for (const project of list) {
    const label = `project "${project.id || project.title || 'unknown'}"`;
    if (!URL_SAFE_ID.test(project.id)) {
      throw new Error(`${label}: id must be lowercase URL-safe kebab-case`);
    }
    if (ids.has(project.id)) {
      throw new Error(`${label}: duplicate id "${project.id}"`);
    }
    ids.add(project.id);

    for (const field of ['client', 'title', 'sector', 'brief', 'outcome'] as const) {
      if (!project[field].trim()) throw new Error(`${label}: ${field} is required`);
    }

    if (!Number.isInteger(project.order) || project.order < 1) {
      throw new Error(`${label}: order must be a positive integer`);
    }
    if (orders.has(project.order)) {
      throw new Error(`${label}: duplicate order ${project.order}`);
    }
    orders.add(project.order);

    if (!Number.isInteger(project.year) || project.year < 2014 || project.year > currentYear) {
      throw new Error(`${label}: year ${project.year} must be between 2014 and ${currentYear}`);
    }

    if (project.disciplines.length === 0) {
      throw new Error(`${label}: must include at least one discipline`);
    }
    const seenDisciplines = new Set<string>();
    for (const d of project.disciplines) {
      if (!DISCIPLINE_SET.has(d)) throw new Error(`${label}: unknown discipline "${d}"`);
      if (seenDisciplines.has(d)) throw new Error(`${label}: duplicate discipline "${d}"`);
      seenDisciplines.add(d);
    }

    if (!COLOUR_SET.has(project.poster.colour)) {
      throw new Error(`${label}: unknown poster colour "${project.poster.colour}"`);
    }
    if (!MOTIF_SET.has(project.poster.motif)) {
      throw new Error(`${label}: unknown poster motif "${project.poster.motif}"`);
    }

    if (project.featured) featuredCount += 1;
  }

  if (featuredCount !== 4) {
    throw new Error(`projects: expected exactly 4 featured projects for Home, found ${featuredCount}`);
  }
}
