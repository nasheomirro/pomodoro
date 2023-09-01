/*
  Counting on the main thread to execute a timeout callback is unreliable,
  because it's possible the browser might limit resources when the app is inactive.
*/

let timeoutId: undefined | number = undefined;

onmessage = function (e) {
  const data = e.data as number | null;
  if (typeof data === "number") {
    // just in case
    this.clearTimeout(timeoutId);

    timeoutId = this.setTimeout(() => {
      this.postMessage("done");
    }, data);
  } else {
    this.clearTimeout(timeoutId);
  }
};

onclose = function () {
  this.clearTimeout(timeoutId);
};
