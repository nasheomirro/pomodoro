import { Timer } from "./timer/Timer";
import { NotificationAudio } from "./notification/NotifcationAudio";
import { Settings } from "./settings/Settings";

function App() {
  return (
    <>
      <NotificationAudio />
      <Timer />
      <Settings />
    </>
  );
}

export default App;
