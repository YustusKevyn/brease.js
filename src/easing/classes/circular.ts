import type { BaseConfiguration, Direction } from "../types";

import { Easing } from "../easing";
import { transform, math } from "../../util";

export interface CircularEasingConfiguration extends BaseConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class CircularEasing extends Easing {
  private _degree: number = 2;
  private _direction: Direction = "in";

  constructor(config?: CircularEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.degree) this._degree = math.limitMin(config.degree, 1);
    if(config?.direction) this._direction = config.direction;
  }

  get degree(){ return this._degree; }
  get direction(){ return this._direction; }

  clone(config?: Partial<CircularEasingConfiguration>){
    return new CircularEasing({
      degree: this._degree,
      direction: this._direction,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end,
      ...config
    });
  }

  protected calculate(x: number){
    return transform.direction(a => 1-Math.sqrt(1-a**this._degree), this._direction, x);
  }
}