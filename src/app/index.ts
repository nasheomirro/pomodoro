import { Settings, TimerState } from "../types";
import { getDurationOfCycle } from "../timer/utils";
import { createWithEqualityFn } from "zustand/traditional";

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

const settings: Settings = {
  durationMins: {
    work: 0.02,
    shortbreak: 2,
    longbreak: 3,
  },
  numCycles: 2,
  volume: 50,
};

export const useTimer = createWithEqualityFn<TimerStore>()(
  (set, get) => ({
    settings,
    state: "idle",
    currentCycle: 0.5,
    remainingDuration: getDurationOfCycle(settings, 0.5),

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
