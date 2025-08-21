import { describe, expect, it, test } from 'vitest';

// import myFunc from '@/utils';
// on simule ici une fonction à tester
function sum(a, b) {
  return a + b;
}

describe.skip('mon premier test avec vitest', () => {
  test('la somme 1 + 2 égale à 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  // skip permet de sauter/esquiver/ignorer le test
  it.skip('la somme 1 + 2 devrait être égale à 3 (erreur)', () => {
    expect(sum(1, 2)).toBe(4);
  });

  it('test avec des chaînes de caractères', () => {
    expect(sum('hello', 'world')).toEqual('helloworld');
  });

  it('comparaison → booléen', () => {
    expect(42 > 16).toBeTruthy();
  });

  it('compare objet → toBe', () => {
    const c = { name: 'Dave Lopper' }; // ref 1
    const d = { name: 'Dave Lopper' }; // ref 2

    expect(d).toBe(c); // FAUX ! → toBe compare les références des objets
  });
  it('compare objet → toEqual', () => {
    const c = { name: 'Dave Lopper' };
    const d = { name: 'Dave Lopper' };

    expect(d).toEqual(c); // VRAI ! → toEqual compare les valeurs
  });
  // ICI c et d sont 2 objets différents (toBe → KO) mais ont les même valeurs (toEqual → OK)
});
