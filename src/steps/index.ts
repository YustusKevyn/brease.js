import type { Args } from "../types";

import Easing from "../easing";
import steps from "./function";

const Directions = ["start", "end", "none", "both"] as const;
export type Direction = (typeof Directions)[number];

export default class Steps extends Easing{
  constructor(number: number, direction: Direction = "end", ...args: Args){
    if(!Directions.includes(direction)) throw new Error("unknown direction");
    super(steps(Math.max(Math.round(number), 1), direction), ...args);
  };
};