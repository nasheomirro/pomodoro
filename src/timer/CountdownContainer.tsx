import { PropsWithChildren } from "react";
import { toFixed } from "../utils";

export const CountdownContainer: React.FC<
  PropsWithChildren<{ progress: number }>
> = ({ children, progress }) => {
  let n = Math.max(toFixed(progress * 360), 0);
  let bgProgress = `conic-gradient(white ${n}deg, transparent ${n}deg)`;
  return (
    <div
      style={{ background: bgProgress }}
      className="max-w-full w-96 aspect-square rounded-full p-1 bg-opacity-80 backdrop-blur-sm"
    >
      <div id="timer-bg" className="rounded-full">
        <div className="bg-black bg-opacity-80 rounded-full">{children}</div>
      </div>
    </div>
  );
};
