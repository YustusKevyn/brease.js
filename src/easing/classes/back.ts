import type { Direction, BaseConfiguration } from "../types";

import { Easing } from "../easing";
import { math, transform } from "../../util";

export interface BackEasingConfiguration extends BaseConfiguration {
  overshoot?: number | undefined;
  direction?: Direction | undefined;
}

export class BackEasing extends Easing {
  private _overshoot: number = 1.5;
  private _direction: Direction = "in";

  constructor(config?: BackEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.direction) this._direction = config.direction;
    if(config?.overshoot) this._overshoot = math.limitMin(config.overshoot, 1);
  }

  get overshoot(){ return this._overshoot; }
  get direction(){ return this._direction; }

  clone(config?: Partial<BackEasingConfiguration>){
    return new BackEasing({
      overshoot: this._overshoot,
      direction: this._direction,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end,
      ...config
    });
  }

  protected calculate(x: number){
    return transform.direction(a => a**2*((this._overshoot+1)*a-this._overshoot), this._direction, x);
  }
}