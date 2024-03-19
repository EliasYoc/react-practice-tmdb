import { atom } from "recoil";

export const darkModeState = atom({
  key: "appConfigState",
  default: false,
});
