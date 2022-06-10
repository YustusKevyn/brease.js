import type { Classes } from "./classes";
import type { presets } from "../presets";

import type { Spring } from "../../spring";
import type { Easing, EasingFunction } from "../../easing";

export type Type = keyof Classes;
export type Preset = keyof typeof presets;

export type Input = Configuration | EasingFunction | Easing | Spring | Preset;
export type Configuration = {[T in Type]: {type: T} & Classes[T]["config"]}[Type];