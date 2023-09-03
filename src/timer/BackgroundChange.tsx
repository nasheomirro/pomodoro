import React, { useEffect } from "react";
import { useTimer } from "../app";
import { backgrounds } from "../app/default";

export const BackgroundChange: React.FC = () => {
  const bgItem = useTimer((store) => backgrounds[store.settings.currentBg]);

  useEffect(() => {
    const backgroundElements = [
      document.querySelector("html"),
      document.querySelector("div#timer-bg"),
    ];

    backgroundElements.forEach((el) => {
      if (el) {
        // @ts-expect-error yes typescript, i know what I'm doing
        el.style.background = `linear-gradient(#0006, #0006 100%), fixed center / cover url("${bgItem.url}")`;
      }
    });
  }, [bgItem]);

  return null;
};
