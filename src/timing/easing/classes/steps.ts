import type { Continuity } from "../types";

import { Easing } from "../easing";
import { math } from "../../../util";

export interface StepsEasingConfiguration {
  steps?: number | undefined;
  continuity?: Continuity | undefined;
}

export class StepsEasing extends Easing {
  private _steps: number = 1;
  private _continuity: Continuity = "end";

  constructor(config?: StepsEasingConfiguration){
    super();
    if(config?.steps !== undefined) this._steps = math.limitMin(Math.round(config.steps), 1);
    if(config?.continuity !== undefined) this._continuity = config.continuity;
  }

  get steps(){ return this._steps; }
  get continuity(){ return this._continuity; }

  clone(config?: StepsEasingConfiguration){
    return new StepsEasing({
      steps: this._steps,
      continuity: this._continuity,
      ...config
    });
  }

  protected calculate(x: number){
    if(this._continuity === "start") return Math.ceil(x*this._steps)/this._steps;
    if(this._continuity === "end") return Math.floor(x*this._steps)/this._steps;
    if(this._continuity === "both") return Math.floor(x*this._steps+1)/(this._steps+1);
    return Math.floor(x*this._steps)/(this._steps-1);
  }
}