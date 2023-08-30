import { PomoConfig } from "../types";

export const getDurationFromCycle = (
  durationConfig: PomoConfig,
  currentCycle: number
) => {
  if (currentCycle >= durationConfig.numCycles) {
    return durationConfig.longbreak;
  }
  return currentCycle % 2 === 0
    ? durationConfig.shortbreak
    : durationConfig.work;
};

/** gives back the message you want to tell the user when the cycle completes */
export const getCycleEndMessage = (
  durationConfig: PomoConfig,
  currentCycle: number
) => {
  if (currentCycle === durationConfig.numCycles - 1) {
    return "Nice work! Lets take a longer break.";
  }
  // work cycles will always be odd.
  return currentCycle % 2 === 0
    ? "Let's get at it!"
    : "It's time to take a break.";
};
