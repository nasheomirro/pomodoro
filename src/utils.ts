export const toFixed = (n: number) => Number(n.toFixed(2));

export const minutesToMs = (n: number) => n * 60 * 1000;

export const getTimerObject = (durationMs: number) => {
  const seconds = Math.ceil(durationMs / 1000) % 60;
  const minutes = Math.floor(durationMs / 60_000);
  return { minutes, seconds };
};

export const getDurationLeft = (end: Date) => {
  const now = new Date();
  const leftMs = end.getTime() - now.getTime();
  return leftMs;
};

export const delay = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
