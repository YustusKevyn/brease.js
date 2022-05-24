import type { BaseConfiguration } from "../types";

import { Easing } from "./easing";
import { lowerLimit } from "../../util/math";

export type StepsEasingContinuity = "start" | "end" | "none" | "both";

export interface StepsEasingConfiguration extends BaseConfiguration {
  steps?: number | undefined;
  continuity?: StepsEasingContinuity | undefined;
}

export class StepsEasing extends Easing {
  private _steps: number = 1;
  private _continuity: StepsEasingContinuity = "end";

  constructor(config?: StepsEasingConfiguration){
    super(x => this.calculate(x), config?.start, config?.end, config?.from, config?.to);
    if(config?.steps) this.steps = config.steps;
    if(config?.continuity) this.continuity = config.continuity;
  }

  get steps(){
    return this._steps;
  }
  set steps(value: number){
    this._steps = lowerLimit(Math.round(value), 1);
  }

  get continuity(){
    return this._continuity;
  }
  set continuity(value: StepsEasingContinuity){
    this._continuity = value;
  }

  clone(){
    return new StepsEasing({
      steps: this._steps,
      continuity: this._continuity,
      start: this.time.start,
      end: this.time.end,
      from: this.output.from,
      to: this.output.to
    });
  }

  private calculate(x: number){
    if(x === 0 || x === 1) return x;
    if(this._continuity === "start") return Math.ceil(x*this._steps)/this._steps;
    if(this._continuity === "end") return Math.floor(x*this._steps)/this._steps;
    if(this._continuity === "both") return Math.floor(x*this._steps+1)/(this._steps+1);
    return Math.floor(x*this._steps)/(this._steps-1);
  }
}