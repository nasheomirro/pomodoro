import { SubmitHandler, useForm } from "react-hook-form";
import { EnableNotification } from "./EnableNotification";
import { Settings } from "../types";
import { useTimer } from "../app";
import { shallow } from "zustand/shallow";

export const SettingsComponent: React.FC = () => {
  const { settings, setSettings } = useTimer(
    ({ settings, setSettings }) => ({
      settings,
      setSettings,
    }),
    shallow
  );

  const { register, handleSubmit } = useForm<Settings>({
    defaultValues: settings,
  });

  const onSubmit: SubmitHandler<Settings> = (data) => {
    setSettings(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        step={0.5}
        {...register("durationMins.work", {
          required: true,
          min: 0,
          valueAsNumber: true,
        })}
      />
      <input
        type="number"
        step={0.5}
        {...register("durationMins.shortbreak", {
          required: true,
          min: 0,
          valueAsNumber: true,
        })}
      />
      <input
        type="number"
        step={0.5}
        {...register("durationMins.longbreak", {
          required: true,
          min: 0,
          valueAsNumber: true,
        })}
      />
      <input
        type="number"
        step={1}
        {...register("numCycles", {
          required: true,
          min: 1,
          valueAsNumber: true,
        })}
      />
      <input
        type="number"
        {...register("volume", {
          required: true,
          min: 0,
          max: 100,
          valueAsNumber: true,
        })}
      />
      <EnableNotification />
      <button>submit</button>
    </form>
  );
};
