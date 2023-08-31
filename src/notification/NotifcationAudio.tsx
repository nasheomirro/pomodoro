import React, { useEffect, useRef } from "react";
import { useSettings } from "../settings";

export const NotificationAudio: React.FC = () => {
  const volume = useSettings((store) => store.config.volume);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  useEffect(() => {
    const audioElement = audioRef.current;
    const listener = () => {
      audioElement?.play();
    };

    window.addEventListener("notification-play", listener);
    return () => window.removeEventListener("notification-play", listener);
  }, [audioRef]);

  return <audio ref={audioRef} src="/bell.wav" />;
};
