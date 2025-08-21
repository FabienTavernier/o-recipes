import { describe, expect, it, test } from 'vitest';

describe('mon premier test avec vitest', () => {
  test('la somme 1 + 2 égale à 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('la somme 1 + 2 devrait être égale à 3 (erreur)', () => {
    expect(1 + 2).toBe(4);
  });
});
