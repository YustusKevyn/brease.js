import type { Direction, BaseConfiguration } from "../types";

import { Easing } from "../easing";
import { transform, math } from "../../util";

export interface PolynomialEasingConfiguration extends BaseConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class PolynomialEasing extends Easing {
  private _degree: number = 2;
  private _direction: Direction = "in";

  constructor(config?: PolynomialEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.degree) this._degree = math.limitMin(config.degree, 1);
    if(config?.direction) this._direction = config.direction;
  }

  get degree(){ return this._degree; }
  get direction(){ return this._direction; }

  clone(config?: Partial<PolynomialEasingConfiguration>){
    return new PolynomialEasing({
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
    return transform.direction(a => a**this._degree, this._direction, x);
  }
}