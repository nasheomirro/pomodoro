export const toFixed = (n: number) => Number(n.toFixed(2));

export const minutesToMs = (n: number) => n * 60 * 1000;

export const join = (...classNames: (string | undefined | null | boolean)[]) =>
  classNames.filter((c) => c).join(" ");

export const delay = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
