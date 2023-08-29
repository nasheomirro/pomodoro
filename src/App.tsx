import { atom, useAtom } from "jotai";
import { DurationConfig, LiveDurationConfig } from "./types";
import { Timer } from "./timer/Timer";

const defaultConfig: DurationConfig = {
  work: 5_000,
  shortbreak: 2_000,
  longbreak: 10_000,
  numCycles: 4,
};

// const defaultConfig: DurationConfig = {
//   work: minutesToMs(25),
//   shortbreak: minutesToMs(5),
//   longbreak: minutesToMs(20),
//   numCycles: 9,
// };

const currentConfigAtom = atom<LiveDurationConfig>({
  ...defaultConfig,
  currCycle: 1,
});

function App() {
  const [durationConfig] = useAtom(currentConfigAtom);

  const requestNotifcation = () => {
    Notification.requestPermission();
  };

  return (
    <>
      <Timer durationConfig={durationConfig} />
      <button onClick={requestNotifcation}>enable notification</button>
    </>
  );
}

export default App;
