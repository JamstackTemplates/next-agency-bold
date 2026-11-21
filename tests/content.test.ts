import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  availabilityHeadline,
  business,
  formatNextStart,
  validateAvailability,
} from '../content/business.ts';
import { processSteps, validateProcessSteps } from '../content/process.ts';
import {
  featuredProjects,
  filterProjects,
  marqueeClients,
  orderedProjects,
  projectSectors,
  projects,
  validateProjects,
  type Project,
} from '../content/projects.ts';
import { services, validateServices } from '../content/services.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and valid availability', () => {
  for (const key of ['name', 'wordmark', 'tagline', 'introduction', 'email', 'phone', 'phoneDisplay'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 3, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.doesNotThrow(() => validateHours(business.hours));
  assert.doesNotThrow(() => validateAvailability(business.availability));
  assert.equal(formatNextStart('2027-02'), 'February 2027');
  assert.equal(availabilityHeadline('2027-04'), 'Taking new projects from April 2027');

  for (const bad of ['2027-00', '2027-13', 'Feb 2027', '2027/02', '']) {
    assert.throws(() => validateAvailability({ nextStart: bad }), /nextStart/, bad);
  }
});

test('projects collection validates IDs, order, disciplines, motifs, years and exactly four featured', () => {
  assert.doesNotThrow(() => validateProjects(projects, 2026));
  assert.equal(featuredProjects().length, 4);
  assert.equal(orderedProjects().length, 8);
  assert.deepEqual(
    marqueeClients(),
    orderedProjects().map(p => p.client),
  );
  assert.ok(projectSectors().length >= 5);

  // Adding a ninth project appears in ordered wall, marquee and discipline filter
  const ninth: Project = {
    id: 'northern-press-zine',
    client: 'Northern Press Co-op',
    title: 'Ink Still Wet',
    disciplines: ['print', 'motion'],
    year: 2026,
    sector: 'Publishing',
    brief: 'Launch an independent print quarterly across indie bookshops.',
    outcome: 'First print run of 2,500 sold out in three weeks.',
    poster: { colour: 'yellow', motif: 'spinning-disc' },
    featured: false,
    order: 9,
  };
  const extended = [...projects, ninth];
  assert.doesNotThrow(() => validateProjects(extended, 2026));
  assert.ok(marqueeClients(extended).includes('Northern Press Co-op'));
  assert.equal(filterProjects(extended, 'motion').length, filterProjects(projects, 'motion').length + 1);

  // Item-specific error reporting
  assert.throws(
    () => validateProjects(projects.map((p, i) => (i === 0 ? { ...p, id: 'Bad ID!' } : p)), 2026),
    /Bad ID!/,
  );
  assert.throws(
    () => validateProjects(projects.map((p, i) => (i === 1 ? { ...p, order: 1 } : p)), 2026),
    /tin-shed-theatre.*duplicate order/,
  );
  assert.throws(
    () => validateProjects(projects.map((p, i) => (i === 2 ? { ...p, year: 2010 } : p)), 2026),
    /pellet-records.*year/,
  );
  assert.throws(
    () => validateProjects(projects.map((p, i) => (i === 0 ? { ...p, featured: false } : p)), 2026),
    /exactly 4 featured/,
  );
});

test('services collection validates consecutive numbers, fees, weeks and availability', () => {
  assert.doesNotThrow(() => validateServices(services));
  assert.equal(services.length, 5);

  assert.throws(
    () => validateServices(services.map((s, i) => (i === 2 ? { ...s, fromFee: 99.5 } : s))),
    /motion-social.*fromFee/,
  );
  assert.throws(
    () => validateServices(services.map((s, i) => (i === 1 ? { ...s, number: 9 } : s))),
    /campaigns.*consecutive/,
  );
  assert.throws(
    () => validateServices(services.map((s, i) => (i === 3 ? { ...s, weeks: { min: 10, max: 4 } } : s))),
    /websites.*weeks/,
  );
});

test('process steps validate consecutive numbering, non-decreasing weeks and 12-week cap', () => {
  assert.doesNotThrow(() => validateProcessSteps(processSteps));
  assert.equal(processSteps.length, 5);

  assert.throws(
    () => validateProcessSteps(processSteps.map((s, i) => (i === 2 ? { ...s, weeks: { start: 1, end: 5 } } : s))),
    /make.*precede/,
  );
  assert.throws(
    () => validateProcessSteps(processSteps.map((s, i) => (i === 4 ? { ...s, weeks: { start: 9, end: 15 } } : s))),
    /launch.*1–12/,
  );
});

test('structured data emits ProfessionalService with offers matching service starting fees', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'ProfessionalService');
  assert.equal(schema.name, business.name);
  assert.equal(schema.foundingDate, '2014');
  assert.equal(schema.address.postalCode, 'M1 1FB');
  assert.equal(schema.openingHoursSpecification.length, 5);
  assert.deepEqual(
    schema.knowsAbout,
    services.map(s => s.name),
  );
  assert.deepEqual(
    schema.makesOffer.map(offer => ({
      name: offer.name,
      minPrice: offer.priceSpecification.minPrice,
      currency: offer.priceSpecification.priceCurrency,
    })),
    services.map(s => ({
      name: s.name,
      minPrice: s.fromFee,
      currency: 'GBP',
    })),
  );
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
