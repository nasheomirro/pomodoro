import { SubmitHandler, useForm } from "react-hook-form";
import { EnableNotification } from "./EnableNotification";
import { Settings } from "../types";
import { useTimer } from "../app";
import { shallow } from "zustand/shallow";
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  forwardRef,
  useLayoutEffect,
  useState,
} from "react";
import { Modal } from "../components/Modal";

import { ReactComponent as SettingIcon } from "../assets/settings.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { backgrounds } from "../app/default";

const SettingsInput = forwardRef<
  HTMLInputElement,
  PropsWithChildren<ComponentPropsWithoutRef<"input">>
>(({ children, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-1">
      <span>{children}</span>
      <Input
        className="p-1 bg-transparent outline-none border-b focus:border-b-blue-500"
        type="number"
        ref={ref}
        {...props}
      />
    </label>
  );
});

export const SettingsComponent: React.FC = () => {
  const { settings, setSettings } = useTimer(
    ({ settings, setSettings }) => ({
      settings,
      setSettings,
    }),
    shallow
  );

  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Settings>({
    defaultValues: settings,
  });

  useLayoutEffect(() => {
    if (!isOpen) reset(settings);
  }, [isOpen, settings]);

  const onSubmit: SubmitHandler<Settings> = (data) => {
    setSettings(data);
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <button
        className="w-10 p-1 bg-black rounded bg-opacity-80 ml-auto block"
        onClick={() => setIsOpen(true)}
      >
        <SettingIcon />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          className="font-sans text-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-between items-start mb-8">
            <span className="font-bold text-xl">Settings</span>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="w-5"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <SettingsInput
              {...register("durationMins.work", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            >
              work
            </SettingsInput>
            <SettingsInput
              {...register("durationMins.shortbreak", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            >
              short
            </SettingsInput>
            <SettingsInput
              {...register("durationMins.longbreak", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            >
              long
            </SettingsInput>
          </div>

          <label className="w-full grid sm:grid-cols-2 items-start gap-2 mb-6">
            <span># of cycles</span>
            <Input
              type="number"
              {...register("numCycles", {
                required: true,
                min: 1,
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="w-full grid sm:grid-cols-2 items-start gap-2 mb-6">
            <span>volume</span>
            <Input
              type="number"
              {...register("volume", {
                required: true,
                min: 0,
                max: 100,
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="w-full grid sm:grid-cols-2 gap-2 items-start mb-10">
            <span>Background</span>
            <select
              className="bg-transparent border-b p-2"
              {...register("currentBg")}
            >
              {backgrounds.map((_, i) => (
                <option className="text-black" value={i}>
                  Background #{i + 1}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-4 flex-wrap justify-end items-center">
            <EnableNotification />
            <Button disabled={!isValid}>save settings</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
