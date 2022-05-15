import { create } from "./functions/create";
import { parse } from "./functions/parse";

export * from "./classes/back";
export * from "./classes/basic";
export * from "./classes/bezier";
export * from "./classes/circular";
export * from "./classes/easing";
export * from "./classes/elastic";
export * from "./classes/polynomial";
export * from "./classes/sinusodial";
export * from "./classes/steps";

export {
  parse as parseEasing,
  create as createEasing
}

export type {
  Function as EasingFunction,
  Direction as EasingDirection
} from "./types";