import type { Direction, BaseConfiguration } from "../types";

import { Easing } from "./easing";
import { lowerLimit } from "../../util/math";
import { transform } from "../../util/function";

export interface BackEasingConfiguration extends BaseConfiguration {
  overshoot?: number | undefined;
  direction?: Direction | undefined;
}

export class BackEasing extends Easing {
  private _overshoot: number = 1.5;
  private _direction: Direction = "in";

  constructor(config?: BackEasingConfiguration){
    super(x => this.calculate(x), config?.start, config?.end, config?.from, config?.to);
    if(config?.overshoot) this.overshoot = config.overshoot;
    if(config?.direction) this.direction = config.direction;
  }

  get overshoot(){
    return this._overshoot;
  }
  set overshoot(value: number){
    this._overshoot = lowerLimit(value, 1);
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
      start: this.time.start,
      end: this.time.end,
      from: this.output.from,
      to: this.output.to
    });
  }

  private calculate(x: number){
    return transform(a => a**2*((this._overshoot+1)*a-this._overshoot), this._direction, x);
  }
}