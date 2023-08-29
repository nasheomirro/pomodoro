import { DurationConfig } from "../types";

export const timerWorker = new Worker(
  new URL("./timer.worker.ts", import.meta.url)
);

export type TimerPayload =
  | {
      type: "start";
      duration: number;
      message: string;
    }
  | {
      type: "stop";
    };

timerWorker.onmessage = (e) => {
  new Notification("Time is up!", { body: e.data });
};

export const notifTimerStart = (duration: number, message: string) => {
  timerWorker.postMessage({ type: "start", duration, message });
};

export const notifTmerStop = () => {
  timerWorker.postMessage({ type: "stop" });
};

/** gives back the message you want to tell the user when the cycle completes */
export const getMessageFromCycle = (
  durationConfig: DurationConfig,
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
