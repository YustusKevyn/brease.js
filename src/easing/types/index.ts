import type { Easing } from "../classes/easing";
import type { Easings } from "./easings";

import { presets } from "../presets";

export type Name = Preset | (string & {});
export type Preset = keyof typeof presets;
export type Function = (time: number) => number;
export type Direction = "in" | "out" | "inOut" | "outIn";
export type Arguments = [from?: number, to?: number, start?: number, end?: number];

export type Type = keyof Easings;
export type Input = Configuration | Function | Easing | Name;
export type Configuration = {[T in Type]: {type: T} & Easings[T]["config"]}[Type];