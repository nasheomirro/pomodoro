/*
  Counting on the main thread to execute a timeout callback is unreliable,
  because it's possible the browser might limit resources when the app is inactive.
*/

type TimerPayload =
  | {
      type: "start";
      duration: number;
      message: string;
    }
  | {
      type: "stop";
    };

let timeoutId: undefined | number = undefined;

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
