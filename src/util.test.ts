import { test, expect } from 'vitest'
import { crop, getCurrentEpoch } from './util'

test('crop', () => {
  expect(crop('abc ... 123\nfoo'))
  .toBe('abc ...')
});

test('epo', () => {
  expect(getCurrentEpoch())
  .toBe(new Date().getTime() / 1000)
})