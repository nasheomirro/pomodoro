import { useNotificationPermissions } from "./permissions";
import { delay } from "../utils";

export const worker = new Worker(new URL("./timer.worker.ts", import.meta.url));

worker.onmessage = (e) => {
  window.dispatchEvent(new CustomEvent("notification-play"));
  if (useNotificationPermissions.getState().permission === "granted")
    delay(1000).then(() => new Notification("Time is up!", { body: e.data }));
};

export const workerTimerStart = (duration: number, endMessage: string) => {
  worker.postMessage({ type: "start", duration, message: endMessage });
};
export const workerTimerStop = () => {
  worker.postMessage({ type: "stop" });
};
