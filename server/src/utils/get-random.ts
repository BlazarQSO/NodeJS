export const getRandomIntInclusive = (min: number, max: number): number => {
  const minInclusive = Math.ceil(min);
  const maxInclusive = Math.floor(max);

  return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
}
