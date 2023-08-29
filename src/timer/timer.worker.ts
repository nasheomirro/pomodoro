import { TimerPayload } from "./notification";

let timeoutId: undefined | number = undefined;

// use of worker is so that setTimeout will fire at the intended moment.
// browsers sometimes delay or stop background processes meaning we might miss
// out on notifications.

onmessage = function (e) {
  const data = e.data as TimerPayload;
  if (data.type === "start") {
    // just in case
    this.clearTimeout(timeoutId);

    timeoutId = this.setTimeout(() => {
      this.postMessage(data.message);
    }, data.duration);
  } else if (data.type === "stop") {
    this.clearTimeout(timeoutId);
  }
};

onclose = function () {
  this.clearTimeout(timeoutId);
};
