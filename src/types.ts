export type DurationConfig = {
  work: number;
  shortbreak: number;
  longbreak: number;
  numCycles: number;
};

export type LiveDurationConfig = DurationConfig & {
  currCycle: number;
};
