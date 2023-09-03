import { Settings, TimerState } from "../types";
import { getDurationOfCycle } from "../timer/utils";
import { createWithEqualityFn } from "zustand/traditional";
import { defaultSettings } from "./default";
import { persist } from "zustand/middleware";

type TimerStore = {
  settings: Settings;
  state: TimerState;
  currentCycle: number;
  remainingDuration: number;

  setSettings: (settings: Settings) => void;
  setState: (state: TimerState) => void;
  setCurrentCycle: (cycle: number) => void;
  setRemainingDuration: (duration: number) => void;
};

export const useTimer = createWithEqualityFn<TimerStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      state: "idle",
      currentCycle: 0.5,
      remainingDuration: getDurationOfCycle(defaultSettings, 0.5),

      setSettings: (settings) => {
        const store = get();
        const newStore = { ...store, settings };
        // also update the remaining duration if it's idle
        if (store.state === "idle") {
          newStore.remainingDuration = getDurationOfCycle(
            settings,
            store.currentCycle
          );
        }

        set(newStore);
      },
      setCurrentCycle: (cycle) => {
        set((store) => ({ ...store, currentCycle: cycle }));
      },
      setRemainingDuration: (duration) => {
        set((store) => ({ ...store, remainingDuration: duration }));
      },
      setState: (state) => {
        set((store) => ({ ...store, state }));
      },
    }),
    { name: "settings" }
  ),
  Object.is
);

type PermissionStore = {
  permission: NotificationPermission | "NA";
  setPermission: (permission: NotificationPermission) => void;
};

export const useNotificationPermission =
  createWithEqualityFn<PermissionStore>()(
    (set) => ({
      permission: window.Notification?.permission || "NA",
      setPermission: (permission) => {
        if ("Notification" in window)
          set((state) => ({ ...state, permission }));
      },
    }),
    Object.is
  );
