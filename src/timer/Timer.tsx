import React, { useEffect, useState } from "react";
import { getDurationLeft, getTimerObject } from "../utils";
import { getEndMessageOfCycle, getDurationOfCycle } from "./duration";
import { workerTimerStart, workerTimerStop } from "../notification/controls";
import { useSettings } from "../settings";

export const Timer: React.FC = () => {
  const config = useSettings((store) => store.config);
  const [state, setState] = useState<
    "paused" | "running" | "finished" | "idle"
  >("idle");
  const [intervalId, setIntervalId] = useState<undefined | number>();
  const [currentCycle, setCurrentCycle] = useState(0.5);
  const [durationLeft, setDurationLeft] = useState(
    getDurationOfCycle(config, currentCycle)
  );

  const startTimer = (duration: number, cycle: number) => {
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
    workerTimerStart(duration, getEndMessageOfCycle(config, cycle));
  };

  const pauseTimer = () => {
    setState("paused");
    setIntervalId(undefined);
    clearInterval(intervalId);
    workerTimerStop();
  };

  const cycleTimer = () => {
    let nextCycle = currentCycle + 0.5;
    if (nextCycle > config.numCycles) {
      nextCycle = 0.5;
    }
    const nextDuration = getDurationOfCycle(config, nextCycle);
    setDurationLeft(nextDuration);
    setCurrentCycle(nextCycle);
    setTimeout(() => startTimer(nextDuration, nextCycle), 0);
  };

  const resetTimer = () => {
    setState("idle");
    setCurrentCycle(1);
    setIntervalId(undefined);
    clearInterval(intervalId);
    workerTimerStop();
  };

  // clean up any intervals on destroy and when intervalId changes
  useEffect(() => () => clearInterval(intervalId), [intervalId]);

  // changes to config updates timer only if idle
  useEffect(() => {
    if (state === "idle") setDurationLeft(getDurationOfCycle(config, 0.5));
  }, [config, setDurationLeft, state, currentCycle]);

  return (
    <>
      <pre>{JSON.stringify(getTimerObject(durationLeft), null, 2)}</pre>
      <div>
        <button onClick={resetTimer}>reset</button>
        <button onClick={() => startTimer(durationLeft, currentCycle)}>
          start
        </button>
        <button onClick={pauseTimer}>pause</button>
        <button
          style={{
            display:
              state === "finished" || state === "paused"
                ? "inline-block"
                : "none",
          }}
          onClick={cycleTimer}
        >
          next
        </button>
      </div>
    </>
  );
};
