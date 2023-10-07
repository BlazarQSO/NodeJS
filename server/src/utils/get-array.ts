export const getArray = <T>(
  count: number,
  cb: (item: T, index: number) => T,
): T[] => Array(count).fill(0).map(cb);
