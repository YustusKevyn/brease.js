import type { Direction } from "../types";

import { Easing } from "../easing";
import { math } from "../../../util";
import { transform } from "../util/transform";

export interface SinusodialEasingConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class SinusodialEasing extends Easing {
  private _degree: number = 1;
  private _direction: Direction = "in";

  constructor(config?: SinusodialEasingConfiguration){
    super();
    if(config?.degree !== undefined) this._degree = math.limitMin(config.degree, 1);
    if(config?.direction !== undefined) this._direction = config.direction;
  }

  get degree(){ return this._degree; }
  get direction(){ return this._direction; }

  clone(config?: SinusodialEasingConfiguration){
    return new SinusodialEasing({
      degree: this._degree,
      direction: this._direction,
      ...config
    });
  }

  protected calculate(x: number){
    return transform(a => 1-Math.cos(a*Math.PI/2)**(1/this._degree), this._direction, x);
  }
}