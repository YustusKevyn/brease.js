import type { Arguments, Function } from "../types";

import { BaseEasing } from "./base";

type Direction = (typeof Directions)[number];
const Directions = ["start", "end", "none", "both"] as const;

export class StepEasing extends BaseEasing {
  constructor(number: number, direction: Direction = "end", ...args: Arguments){
    super(StepEasing.fn(number, direction), ...args);
  }

  static fn(number: number, direction: Direction = "end"): Function {
    if(number < 1 ) number = 1;
    else number = Math.round(number);

    if(direction === "start") return t => t === 1 || t === 0 ? t : Math.ceil(t*number)/number;
    if(direction === "end") return t => t === 1 || t === 0 ? t : Math.floor(t*number)/number;
    if(direction === "both") return t => t === 1 || t === 0 ? t : Math.floor(t*number+1)/(number+1);
    return t => t === 1 || t === 0 ? t : Math.floor(t*number)/(number-1);
  }
}

export type {
  Direction as StepEasingDirection
}