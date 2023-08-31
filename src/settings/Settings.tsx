import { SubmitHandler, useForm } from "react-hook-form";
import { useSettings } from ".";
import { Config } from "../types";
import { EnableNotification } from "./EnableNotification";

export const Settings: React.FC = () => {
  const config = useSettings((store) => store.config);
  const setConfig = useSettings((store) => store.setConfig);
  const { register, handleSubmit } = useForm<Config>({ defaultValues: config });

  const onSubmit: SubmitHandler<Config> = (data) => {
    setConfig(data);
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
