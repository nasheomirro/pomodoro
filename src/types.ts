export type Settings = {
  /** the duration (in minutes) for each part of pomodoro */
  durationMins: {
    work: number;
    shortbreak: number;
    longbreak: number;
  };
  /** the number of work cycles until a long break */
  numCycles: number;
  /** a number from 0 - 100 for the volume */
  volume: number;
};

export type TimerState = "paused" | "running" | "idle";
