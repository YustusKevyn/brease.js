import type { BaseConfiguration } from "../types";

import { math } from "../../util";
import { Easing } from "../easing";

export type StepsEasingContinuity = "start" | "end" | "none" | "both";

export interface StepsEasingConfiguration extends BaseConfiguration {
  steps?: number | undefined;
  continuity?: StepsEasingContinuity | undefined;
}

export class StepsEasing extends Easing {
  private _steps: number = 1;
  private _continuity: StepsEasingContinuity = "end";

  constructor(config?: StepsEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.steps) this._steps = math.limitMin(Math.round(config.steps), 1);
    if(config?.continuity) this._continuity = config.continuity;
  }

  get steps(){ return this._steps; }
  get continuity(){ return this._continuity; }

  clone(config?: Partial<StepsEasingConfiguration>){
    return new StepsEasing({
      steps: this._steps,
      continuity: this._continuity,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end,
      ...config
    });
  }

  protected calculate(x: number){
    if(x === 0 || x === 1) return x;
    if(this._continuity === "start") return Math.ceil(x*this._steps)/this._steps;
    if(this._continuity === "end") return Math.floor(x*this._steps)/this._steps;
    if(this._continuity === "both") return Math.floor(x*this._steps+1)/(this._steps+1);
    return Math.floor(x*this._steps)/(this._steps-1);
  }
}