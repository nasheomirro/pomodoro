import React, { useEffect, useLayoutEffect, useRef } from "react";
import { worker } from "./timerWorker";
import { delay } from "../utils";
import { useNotificationPermission, useTimer } from "../app";
import { getEndMessageOfCycle } from "./utils";
import { shallow } from "zustand/shallow";

/**
 * Handles notifcation sound and using the Notification API.
 */
export const DoneAudio: React.FC = () => {
  const permission = useNotificationPermission((store) => store.permission);
  const { message, volume } = useTimer(
    (store) => ({
      volume: store.settings.volume,
      message: getEndMessageOfCycle(store.settings, store.currentCycle),
    }),
    shallow
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  // useLayout instead of useEffect because Timer updates message value,
  // which results in the listener being removed before it gets to fire,
  // so we'll first before it changes.
  useLayoutEffect(() => {
    const audioElement = audioRef.current;
    const onMessage = () => {
      audioElement?.play();
      if (permission === "granted") {
        delay(1000).then(
          () => new Notification("Time is up!", { body: message })
        );
      }
    };
    worker.addEventListener("message", onMessage);
    return () => worker.removeEventListener("message", onMessage);
  }, [audioRef, message, permission, worker]);

  // update audio's volume if volume in settings change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return <audio ref={audioRef} src="/bell.wav" />;
};
