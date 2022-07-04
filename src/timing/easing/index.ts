import { create } from "./functions/create";
import { match } from "./functions/match";
import { parse } from "./functions/parse";

export * from "./easing";

export * from "./classes/back";
export * from "./classes/basic";
export * from "./classes/bezier";
export * from "./classes/circular";
export * from "./classes/elastic";
export * from "./classes/polynomial";
export * from "./classes/sinusodial";
export * from "./classes/steps";

export const easing = {
  create,
  match,
  parse
};

export type {
  Type as EasingType,
  Input as EasingInput,
  Preset as EasingPreset,
  Function as EasingFunction,
  Direction as EasingDirection,
  Continuity as EasingContinuity,
  Configuration as EasingConfiguration
} from "./types";