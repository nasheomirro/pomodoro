import React, { useCallback, useEffect, useState } from "react";
import { join } from "../utils";

import { ReactComponent as Reset } from "../assets/reset.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import { ReactComponent as Next } from "../assets/next.svg";

import {
  getDurationOfCycle,
  getNameOfCycle,
  getCycleOfCycle,
  getRemainingDuration,
  getMinuteRepresentation,
} from "./utils";

import { worker, workerTimerStart, workerTimerStop } from "./timerWorker";
import { shallow } from "zustand/shallow";
import { useTimer } from "../app";
import { CountdownContainer } from "./CountdownContainer";

export const Timer: React.FC = () => {
  const {
    settings,
    currentCycle,
    state,
    remainingDuration,
    setState,
    setCurrentCycle,
    setRemainingDuration,
  } = useTimer((store) => ({ ...store }), shallow);

  const [intervalId, setIntervalId] = useState<undefined | number>();

  // start the presentational timer and the worker's timer
  const startTimer = () => {
    const endDate = new Date();
    endDate.setTime(endDate.getTime() + remainingDuration);

    const newId = setInterval(() => {
      let newDuration = Math.max(getRemainingDuration(endDate), 0);
      // if presentational has finished, just clear the interval and wait
      // for the worker to fire.
      if (newDuration === 0) {
        clearInterval(newId);
        setIntervalId(undefined);
      }
      setRemainingDuration(newDuration);
    }, 1000);
    workerTimerStart(remainingDuration);
    setState("running");
    setIntervalId(newId);
  };

  const pauseTimer = () => {
    setState("paused");
    setIntervalId(undefined);
    clearInterval(intervalId);
    workerTimerStop();
  };

  const resetTimer = useCallback(() => {
    setState("idle");
    setCurrentCycle(0.5);
    setIntervalId(undefined);
    setRemainingDuration(getDurationOfCycle(settings, 0.5));
    clearInterval(intervalId);
    workerTimerStop();
  }, [settings, setState, setCurrentCycle, setIntervalId]);

  // place both timers in the next part of the pomodoro
  const cycleTimer = useCallback(() => {
    resetTimer();
    let nextCycle = currentCycle + 0.5;
    if (nextCycle > settings.numCycles) {
      nextCycle = 0.5;
    }
    const nextDuration = getDurationOfCycle(settings, nextCycle);
    setRemainingDuration(nextDuration);
    setCurrentCycle(nextCycle);
  }, [
    resetTimer,
    currentCycle,
    setCurrentCycle,
    setRemainingDuration,
    settings,
  ]);

  // automatically cycle the timer if the current half is finished
  useEffect(() => {
    const onMessage = () => {
      cycleTimer();
    };
    worker.addEventListener("message", onMessage);
    return () => worker.removeEventListener("message", onMessage);
  }, [cycleTimer]);

  // clean up any intervals on destroy and when intervalId changes
  useEffect(() => () => clearInterval(intervalId), [intervalId]);

  console.log(remainingDuration, getDurationOfCycle(settings, currentCycle));

  return (
    <CountdownContainer
      progress={remainingDuration / getDurationOfCycle(settings, currentCycle)}
    >
      <div className="max-w-full w-96 aspect-square flex flex-col items-center justify-center rounded-full">
        {/* Timer */}
        <div className="text-center mb-4">
          <span className="block text-xl">
            {getNameOfCycle(settings, currentCycle)}
          </span>
          <span className="block text-md mb-2">
            {getCycleOfCycle(settings, currentCycle)}
          </span>
          <span className="w-full block font-light text-5xl sm:text-7xl lg:text-8xl tabular-nums">
            {getMinuteRepresentation(remainingDuration)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 text-lg">
          <button className="w-7" onClick={resetTimer}>
            <Reset />
          </button>
          <button
            className={join("w-7", state !== "running" ? "block" : "hidden")}
            onClick={startTimer}
          >
            <Play />
          </button>
          <button
            className={join("w-7", state === "running" ? "block" : "hidden")}
            onClick={pauseTimer}
          >
            <Pause />
          </button>

          <button className="w-7" onClick={cycleTimer}>
            <Next />
          </button>
        </div>
      </div>
    </CountdownContainer>
  );
};
