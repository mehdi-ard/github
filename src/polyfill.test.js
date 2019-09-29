import './polyfill';

test('string repeat', () => {
  expect('aaa'.repeat(0)).toBe('');
  expect('aaa'.repeat(1)).toBe('aaa');
  expect('aaa'.repeat(2)).toBe('aaaaaa');
  expect('aaa'.repeat(3)).toBe('aaaaaaaaa');
});
