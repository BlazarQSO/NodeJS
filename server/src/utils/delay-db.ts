export const delayDb = (ms: number = 100): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
