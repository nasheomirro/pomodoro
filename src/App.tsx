import { DoneAudio } from "./timer/DoneAudio";
import { SettingsComponent } from "./timer/Settings";
import { Timer } from "./timer/Timer";

function App() {
  return (
    <div className="grow flex-col flex items-center p-6">
      <div className="w-full mx-auto max-w-screen-xl">
        <SettingsComponent />
      </div>
      <div className="grow w-full flex items-center justify-center">
        <Timer />
      </div>
      <DoneAudio />
    </div>
  );
}

export default App;
