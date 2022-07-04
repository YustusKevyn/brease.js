import type { Direction } from "../types";

import { Easing } from "../easing";
import { math } from "../../../util";
import { transform } from "../util/transform";

export interface BackEasingConfiguration {
  overshoot?: number | undefined;
  direction?: Direction | undefined;
}

export class BackEasing extends Easing {
  private _overshoot: number = 1.5;
  private _direction: Direction = "in";

  constructor(config?: BackEasingConfiguration){
    super();
    if(config?.overshoot !== undefined) this._overshoot = math.limitMin(config.overshoot, 1);
    if(config?.direction !== undefined) this._direction = config.direction;
  }

  get overshoot(){ return this._overshoot; }
  get direction(){ return this._direction; }

  clone(config?: BackEasingConfiguration){
    return new BackEasing({
      overshoot: this._overshoot,
      direction: this._direction,
      ...config
    });
  }

  protected calculate(x: number){
    return transform(a => a**2*((this._overshoot+1)*a-this._overshoot), this._direction, x);
  }
}