import { Config } from "../types";

export const getDurationOfCycle = (
  { durationMins: duration, numCycles }: Config,
  currentCycle: number
) => {
  // every cycle actually has two parts, work and break.
  // the config shows how many cycles the user wants to do,
  // but in here, we acually want to do it by halfs so that
  // we know if the user is in the work part of the cycle, or the
  // break part.
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
  { numCycles }: Config,
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
