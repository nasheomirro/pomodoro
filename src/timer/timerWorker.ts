export const worker = new Worker(new URL("./timer.worker.ts", import.meta.url));

export const workerTimerStart = (duration: number) => {
  worker.postMessage(duration);
};

export const workerTimerStop = () => {
  worker.postMessage(null);
};
