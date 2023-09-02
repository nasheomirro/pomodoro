import { Settings } from "../types";

export const getRemainingDuration = (end: Date) => {
  const now = new Date();
  return end.getTime() - now.getTime();
};

export const getMinuteRepresentation = (durationMs: number) => {
  const seconds = (Math.ceil(durationMs / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(Math.ceil(durationMs / 1000) / 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const getDurationOfCycle = (
  { durationMins: duration, numCycles }: Settings,
  currentCycle: number
) => {
  let current: number;
  if (currentCycle >= numCycles) {
    current = duration.longbreak;
  } else {
    current = Number.isInteger(currentCycle % 1)
      ? duration.shortbreak
      : duration.work;
  }
  // convert to ms
  return current * 1000 * 60;
};

/** gives back the message you want to tell the user when the cycle completes */
export const getEndMessageOfCycle = (
  { numCycles }: Settings,
  currentCycle: number
) => {
  if (currentCycle === numCycles - 1) {
    return "Nice work! Lets take a longer break.";
  }
  // work cycles will always be odd.
  return currentCycle % 2 === 0
    ? "Let's get at it!"
    : "It's time to take a break.";
};

export const getNameOfCycle = (
  { numCycles }: Settings,
  currentCycle: number
) => {
  if (currentCycle >= numCycles) {
    return "Long Break";
  } else if (Number.isInteger(currentCycle % 1)) {
    return "Short Break";
  } else {
    return "Pomodoro";
  }
};

export const getCycleOfCycle = (
  { numCycles }: Settings,
  currentCycle: number
) => {
  if (currentCycle >= numCycles) {
    return "complete";
  }
  let num = Math.ceil(currentCycle);
  let place =
    num === 1 ? "1st" : num === 2 ? "2nd" : num === 3 ? "3rd" : `${num}th`;
  return place + " cycle";
};
