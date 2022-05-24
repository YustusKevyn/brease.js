import type { Direction, BaseConfiguration, Function } from "../types";

import { Easing } from "./easing";
import { lowerLimit } from "../../util/math";
import { transform } from "../../util/function";

export interface PolynomialEasingConfiguration extends BaseConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class PolynomialEasing extends Easing {
  private _degree: number = 2;
  private _direction: Direction = "in";

  constructor(config?: PolynomialEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.degree) this.degree = config.degree;
    if(config?.direction) this.direction = config.direction;
  }

  get degree(){
    return this._degree;
  }
  set degree(value: number){
    this._degree = lowerLimit(value, 1);
  }

  get direction(){
    return this._direction;
  }
  set direction(value: Direction){
    this._direction = value;
  }

  clone(){
    return new PolynomialEasing({
      degree: this._degree,
      direction: this._direction,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end
    });
  }

  protected calculate(x: number){
    return transform(a => a**this._degree, this._direction, x);
  }
}