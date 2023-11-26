import { getRandomIntInclusive } from '../get-random';

describe('testing utils', () => {
  it('should get 1', () => {
    const res = getRandomIntInclusive(1, 1);
    expect(res).toEqual(1);
  });
});
