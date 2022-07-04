import type { Easing } from "../easing";
import type { Classes } from "./classes";
import type { presets } from "../presets";

export type Input = Easing | Preset | Function | Configuration;
export type Preset = keyof typeof presets;

export type Function = (x: number) => number;
export type Direction = "in" | "out" | "inOut" | "outIn";
export type Continuity = "start" | "end" | "none" | "both";

export type Type = keyof Classes;
export type Configuration = {[T in Type]: {type: T} & Classes[T]["config"]}[Type];

export interface Match {
  end: number;
  start: number;
  value: Easing;
}