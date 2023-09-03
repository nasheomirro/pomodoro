import { Settings } from "../types";

export const defaultSettings: Settings = {
  durationMins: {
    work: 25,
    shortbreak: 5,
    longbreak: 10,
  },
  numCycles: 4,
  volume: 50,
  currentBg: 0,
};

export const backgrounds = [
  {
    url: "/bg-0.jpg",
    author: "J.Balla Photography",
    authorUrl:
      "https://unsplash.com/@jballa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    url: "/bg-1.jpg",
    author: "Aylin Çobanoğlu",
    authorUrl:
      "https://unsplash.com/@zynpayln?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    url: "/bg-2.jpg",
    author: "Mark Harpur",
    authorUrl:
      "https://unsplash.com/@luckybeanz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    url: "/bg-3.jpg",
    author: "davide ragusa",
    authorUrl:
      "https://unsplash.com/@davideragusa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    url: "/bg-4.jpg",
    author: "Johannes Plenio",
    authorUrl:
      "https://unsplash.com/@jplenio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
];
