import React, { useEffect, useRef } from "react";
import { PomoConfig } from "../types";

type Props = {
  config: PomoConfig;
};

export const NotificationAudio: React.FC<Props> = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    const audioContext = new (window.AudioContext ||
      // @ts-expect-error webkit is for legacy
      window.webkitAudioContext)();

    if (audioElement) {
      const track = audioContext.createMediaElementSource(audioElement);
      track.connect(audioContext.destination);
    }

    const listener = () => {
      audioElement?.play();
    };

    window.addEventListener("notification-play", listener);
    return () => window.removeEventListener("notification-play", listener);
  }, [audioRef]);

  return <audio ref={audioRef} src="/bell.wav" />;
};
