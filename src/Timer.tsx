import React, { useEffect, useState } from "react";
import { getDurationFromCycle, getDurationLeft, getTimerObject } from "./utils";
import { DurationConfig } from "./types";

type Props = {
  durationConfig: DurationConfig;
  onComplete?: () => void;
};

export const Timer: React.FC<Props> = ({
  durationConfig,
  onComplete = () => {},
}) => {
  const [state, setState] = useState<
    "paused" | "running" | "finished" | "idle"
  >("idle");
  const [intervalId, setIntervalId] = useState<undefined | number>();
  const [currentCycle, setCurrentCycle] = useState(1);
  const [durationLeft, setDurationLeft] = useState(
    getDurationFromCycle(durationConfig, currentCycle)
  );

  const startTimer = (duration: number) => {
    const endDate = new Date();
    endDate.setTime(endDate.getTime() + duration);

    const newId = setInterval(() => {
      let newDuration = getDurationLeft(endDate);
      if (newDuration <= 0) {
        newDuration = 0;
        clearInterval(newId);
        setIntervalId(undefined);
        setState("finished");
      }
      setDurationLeft(newDuration);
    }, 1000);

    setState("running");
    setIntervalId(newId);
  };

  const pauseTimer = () => {
    setState("paused");
    setIntervalId(undefined);
    clearInterval(intervalId);
  };

  const finishTimer = () => {
    let nextCycle = currentCycle + 1;

    if (nextCycle > durationConfig.numCycles) {
      setState("idle");
      onComplete();
      return;
    }

    const nextDuration = getDurationFromCycle(durationConfig, currentCycle + 1);
    setDurationLeft(nextDuration);
    setCurrentCycle(nextCycle);
    setTimeout(() => startTimer(nextDuration), 0);
  };

  // clean up any intervals on destroy and when intervalId changes
  useEffect(() => () => clearInterval(intervalId), [intervalId]);

  // changes to duration updates current duration only if idle
  useEffect(() => {
    if (state === "idle") {
      setDurationLeft(getDurationFromCycle(durationConfig, currentCycle));
    }
  }, [durationConfig, setDurationLeft, state, currentCycle]);

  return (
    <>
      <pre>{JSON.stringify(getTimerObject(durationLeft), null, 2)}</pre>
      <div>
        <button onClick={() => startTimer(durationLeft)}>start</button>
        <button onClick={pauseTimer}>pause</button>
        <button
          style={{ display: state !== "finished" ? "none" : "inline-block" }}
          onClick={finishTimer}
        >
          finish
        </button>
      </div>
    </>
  );
};
