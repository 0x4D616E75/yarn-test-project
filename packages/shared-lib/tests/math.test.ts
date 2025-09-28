import { add } from '../src/add'; // Beispiel — passe an eure tatsächliche API an

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
