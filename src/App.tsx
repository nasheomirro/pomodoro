import { DoneAudio } from "./timer/DoneAudio";
import { Timer } from "./timer/Timer";

function App() {
  return (
    <div className="grow flex-col flex items-center justify-center p-32">
      <Timer />
      <DoneAudio />
      {/* <Settings /> */}
    </div>
  );
}

export default App;
