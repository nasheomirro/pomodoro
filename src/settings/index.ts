import { create } from "zustand";
import { Config } from "../types";

type Settings = {
  config: Config;
  setConfig: (config: Config) => void;
};

const defaultConfig: Config = {
  durationMins: {
    work: 1,
    shortbreak: 2,
    longbreak: 3,
  },
  numCycles: 2,
  volume: 50,
};

export const useSettings = create<Settings>()((set) => ({
  config: defaultConfig,
  setConfig: (config) => set((state) => ({ ...state, config })),
}));
