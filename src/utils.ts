import { DurationConfig } from "./types";

export const minutesToMs = (n: number) => n * 60 * 1000;

export const getTimerObject = (durationMs: number) => {
  const seconds = Math.ceil(durationMs / 1000) % 60;
  const minutes = Math.floor(durationMs / 60_000);
  return { minutes, seconds };
};

export const getDurationFromCycle = (
  durationConfig: DurationConfig,
  currentCycle: number
) => {
  if (currentCycle >= durationConfig.numCycles) {
    return durationConfig.longbreak;
  }
  return currentCycle % 2 === 0
    ? durationConfig.shortbreak
    : durationConfig.work;
};

export const getDurationLeft = (end: Date) => {
  const now = new Date();
  const leftMs = end.getTime() - now.getTime();
  return leftMs;
};
