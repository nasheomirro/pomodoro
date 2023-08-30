import { atom, useAtom } from "jotai";
import { PomoConfig } from "./types";
import { Timer } from "./timer/Timer";
import { useState } from "react";
import { NotificationAudio } from "./notification/NotifcationAudio";

const defaultConfig: PomoConfig = {
  work: 3_000,
  shortbreak: 2_000,
  longbreak: 4_000,
  numCycles: 4,
};

// const defaultConfig: DurationConfig = {
//   work: minutesToMs(25),
//   shortbreak: minutesToMs(5),
//   longbreak: minutesToMs(20),
//   numCycles: 9,
// };

const currentConfigAtom = atom<PomoConfig>({
  ...defaultConfig,
});

function App() {
  const [config] = useAtom(currentConfigAtom);
  const [permission, setPermission] = useState(Notification.permission);

  const requestNotifcation = () => {
    if ("Notification" in window) {
      Notification.requestPermission((response) => {
        setPermission(response);
      });
    }
  };

  if (permission !== "granted") {
    return (
      <>
        <p>please enable notifications</p>
        <button onClick={requestNotifcation}>enable notification</button>
      </>
    );
  }

  return (
    <>
      <NotificationAudio config={config} />
      <Timer config={config} />;
    </>
  );
}

export default App;
