import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveActivePage,
  getAdjacentPages,
  filterConceptsByCategory,
  filterServicesByCategory,
} from './briefBuilder';
import { SITE_CONFIG, NAV_PAGES } from '../config/siteConfig';

test('resolveActivePage maps valid page hashes and defaults invalid ones to overview', () => {
  assert.equal(resolveActivePage('overview'), 'overview');
  assert.equal(resolveActivePage('#about'), 'about');
  assert.equal(resolveActivePage('#capabilities'), 'capabilities');
  assert.equal(resolveActivePage('showcase'), 'showcase');
  assert.equal(resolveActivePage('#contact'), 'contact');
  assert.equal(resolveActivePage('unknown-section'), 'overview');
  assert.equal(resolveActivePage(null), 'overview');
});

test('getAdjacentPages returns accurate previous and next page descriptors', () => {
  const first = getAdjacentPages('overview');
  assert.equal(first.previous, null);
  assert.equal(first.next?.id, 'capabilities');

  const second = getAdjacentPages('capabilities');
  assert.equal(second.previous?.id, 'overview');
  assert.equal(second.next?.id, 'about');

  const last = getAdjacentPages('contact');
  assert.equal(last.previous?.id, 'showcase');
  assert.equal(last.next, null);
  assert.equal(NAV_PAGES.length, 5);
});

test('filterConceptsByCategory returns all or matching concepts and preserves concept labels', () => {
  const allConcepts = filterConceptsByCategory(SITE_CONFIG.showcaseConcepts, 'all');
  assert.equal(allConcepts.length, 4);

  for (const concept of allConcepts) {
    assert.ok(
      concept.statusLabel.toLowerCase().includes('concept') ||
        concept.statusLabel.toLowerCase().includes('minh hoạ'),
      'Every showcase item must be honestly labeled as concept/minh hoạ'
    );
  }

  const giftConcepts = filterConceptsByCategory(SITE_CONFIG.showcaseConcepts, 'gift');
  assert.equal(giftConcepts.length, 1);
  assert.equal(giftConcepts[0].id, 'concept-memory-gift');
});

test('filterServicesByCategory filters capabilities accurately', () => {
  const allServices = filterServicesByCategory(SITE_CONFIG.services, 'all');
  assert.equal(allServices.length, 4);

  const toolServices = filterServicesByCategory(SITE_CONFIG.services, 'tool');
  assert.equal(toolServices.length, 1);
  assert.equal(toolServices[0].id, 'digital-utility');
});
