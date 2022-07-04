import type { Direction } from "../types";

import { Easing } from "../easing";
import { math } from "../../../util";
import { transform } from "../util/transform";

export interface CircularEasingConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class CircularEasing extends Easing {
  private _degree: number = 2;
  private _direction: Direction = "in";

  constructor(config?: CircularEasingConfiguration){
    super();
    if(config?.degree !== undefined) this._degree = math.limitMin(config.degree, 1);
    if(config?.direction !== undefined) this._direction = config.direction;
  }

  get degree(){ return this._degree; }
  get direction(){ return this._direction; }

  clone(config?: CircularEasingConfiguration){
    return new CircularEasing({
      degree: this._degree,
      direction: this._direction,
      ...config
    });
  }

  protected calculate(x: number){
    return transform(a => 1-Math.sqrt(1-a**this._degree), this._direction, x);
  }
}