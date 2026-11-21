import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, studioOpeningStatus, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => (day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' }));
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('Loud Hands Europe/London schedule boundaries and March/October DST changes', () => {
  const studioAt = (isoUtc: string) => studioOpeningStatus(business.hours, 'Europe/London', new Date(isoUtc));

  // Winter GMT (UTC+0): Monday 2026-11-16
  assert.equal(studioAt('2026-11-16T09:29:00Z').isOpen, false);
  assert.equal(studioAt('2026-11-16T09:29:00Z').label, 'Studio closed now');
  assert.equal(studioAt('2026-11-16T09:30:00Z').isOpen, true);
  assert.equal(studioAt('2026-11-16T09:30:00Z').label, 'In the studio now');
  assert.equal(studioAt('2026-11-16T17:59:00Z').isOpen, true);
  assert.equal(studioAt('2026-11-16T18:00:00Z').isOpen, false);

  // Weekend closed (Saturday & Sunday)
  assert.equal(studioAt('2026-11-21T12:00:00Z').isOpen, false);
  assert.equal(studioAt('2026-11-22T12:00:00Z').isOpen, false);
  assert.match(studioAt('2026-11-21T12:00:00Z').detail, /Monday at 09:30/);

  // March DST spring forward: UK switches to BST (UTC+1) on Sunday 2026-03-29 at 01:00 UTC.
  // Monday 2026-03-30 09:30 BST is 08:30 UTC; 18:00 BST is 17:00 UTC.
  assert.equal(studioAt('2026-03-30T08:29:00Z').isOpen, false);
  assert.equal(studioAt('2026-03-30T08:30:00Z').isOpen, true);
  assert.equal(studioAt('2026-03-30T16:59:00Z').isOpen, true);
  assert.equal(studioAt('2026-03-30T17:00:00Z').isOpen, false);

  // October DST fall back: UK switches back to GMT (UTC+0) on Sunday 2026-10-25 at 01:00 UTC.
  // Monday 2026-10-26 09:30 GMT is 09:30 UTC; 18:00 GMT is 18:00 UTC.
  assert.equal(studioAt('2026-10-26T09:29:00Z').isOpen, false);
  assert.equal(studioAt('2026-10-26T09:30:00Z').isOpen, true);
  assert.equal(studioAt('2026-10-26T17:59:00Z').isOpen, true);
  assert.equal(studioAt('2026-10-26T18:00:00Z').isOpen, false);

  // Neutral fallback without timezone
  assert.equal(studioOpeningStatus(business.hours, '').label, 'Studio hours, visits by appointment');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))), /Tuesday/);
});
