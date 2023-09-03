import React from "react";
import { useTimer } from "../app";
import { backgrounds } from "../app/default";

export const AttributionText: React.FC = () => {
  const bgItem = useTimer((store) => backgrounds[store.settings.currentBg]);
  return (
    <div className="text-sm">
      Background by{" "}
      <a className="underline" href={bgItem.authorUrl}>
        {bgItem.author}
      </a>
    </div>
  );
};
