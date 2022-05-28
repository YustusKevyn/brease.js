import type { Direction, BaseConfiguration } from "../types";

import { Easing } from "./easing";
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
    if(config?.overshoot) this.overshoot = config.overshoot;
    if(config?.direction) this.direction = config.direction;
  }

  get overshoot(){
    return this._overshoot;
  }
  set overshoot(value: number){
    this._overshoot = math.limitMin(value, 1);
  }

  get direction(){
    return this._direction;
  }
  set direction(value: Direction){
    this._direction = value;
  }

  clone(){
    return new BackEasing({
      overshoot: this._overshoot,
      direction: this._direction,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end
    });
  }

  protected calculate(x: number){
    return transform.direction(a => a**2*((this._overshoot+1)*a-this._overshoot), this._direction, x);
  }
}