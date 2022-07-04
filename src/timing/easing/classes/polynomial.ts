import type { Direction } from "../types";

import { Easing } from "../easing";
import { math } from "../../../util";
import { transform } from "../util/transform";

export interface PolynomialEasingConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class PolynomialEasing extends Easing {
  private _degree: number = 2;
  private _direction: Direction = "in";

  constructor(config?: PolynomialEasingConfiguration){
    super();
    if(config?.degree !== undefined) this._degree = math.limitMin(config.degree, 1);
    if(config?.direction !== undefined) this._direction = config.direction;
  }

  get degree(){ return this._degree; }
  get direction(){ return this._direction; }

  clone(config?: PolynomialEasingConfiguration){
    return new PolynomialEasing({
      degree: this._degree,
      direction: this._direction,
      ...config
    });
  }

  protected calculate(x: number){
    return transform(a => a**this._degree, this._direction, x);
  }
}