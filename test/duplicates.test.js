const test = require('node:test');
const assert = require('node:assert/strict');
const { isDuplicate, hasSameOwner } = require('../tools/duplicates');
test('pages with identical titles are recognized as duplicates', () => {
  const pageA = { title: 'Home' };
  const pageB = { title: 'Home' };
  assert.equal(isDuplicate(pageA, pageB), true);
});

test('pages with different titles are not duplicates', () => {
  const pageA = { title: 'Home' };
  const pageB = { title: 'About' };
  assert.equal(isDuplicate(pageA, pageB), false);
});

test('missing page arguments return false', () => {
  assert.equal(isDuplicate(null, { title: 'Home' }), false);
  assert.equal(isDuplicate({ title: 'Home' }, null), false);
  assert.equal(isDuplicate(null, null), false);
});
test('pages with the same owner are recognized', () => {
  assert.equal(
    hasSameOwner({ ownerId: 'owner-1' }, { ownerId: 'owner-1' }),
    true
  );
});

test('pages with different owners are not recognized as same owner', () => {
  assert.equal(
    hasSameOwner({ ownerId: 'owner-1' }, { ownerId: 'owner-2' }),
    false
  );
});

test('missing page arguments return false for owner comparison', () => {
  assert.equal(hasSameOwner(null, { ownerId: 'owner-1' }), false);
  assert.equal(hasSameOwner({ ownerId: 'owner-1' }, null), false);
});


