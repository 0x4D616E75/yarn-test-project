import { formatUserName } from '../src/index';

describe('formatUserName', () => {
  it('should remove trailing whitespaces of lastname', () => {
    expect(formatUserName('firstname', 'lastname   ')).toBe('firstname lastname');
  });
});
