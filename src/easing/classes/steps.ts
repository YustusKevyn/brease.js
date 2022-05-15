import type { Arguments, Function } from "../types";

import { Easing } from "./easing";

export type StepsEasingContinuity = "start" | "end" | "none" | "both";

export interface StepsEasingConfiguration {
  steps: number;
  continuity?: StepsEasingContinuity | undefined;
}

export class StepsEasing extends Easing {
  constructor(configuration: StepsEasingConfiguration, ...args: Arguments){
    super(StepsEasing.fn(configuration.steps, configuration.continuity), ...args);
  }

  static fn(steps: number, continuity: StepsEasingContinuity = "end"): Function {
    if(steps < 1 ) steps = 1;
    else steps = Math.round(steps);

    if(continuity === "start") return t => t === 1 || t === 0 ? t : Math.ceil(t*steps)/steps;
    if(continuity === "end") return t => t === 1 || t === 0 ? t : Math.floor(t*steps)/steps;
    if(continuity === "both") return t => t === 1 || t === 0 ? t : Math.floor(t*steps+1)/(steps+1);
    return t => t === 1 || t === 0 ? t : Math.floor(t*steps)/(steps-1);
  }
}