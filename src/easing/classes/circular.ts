import type { BaseConfiguration, Direction, Function } from "../types";

import { Easing } from "./easing";
import { lowerLimit } from "../../util/math";
import { transform } from "../../util/function";

export interface CircularEasingConfiguration extends BaseConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class CircularEasing extends Easing {
  private _degree: number = 2;
  private _direction: Direction = "in";

  constructor(config?: CircularEasingConfiguration){
    super(x => this.calculate(x), config?.start, config?.end, config?.from, config?.to);
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
    return new CircularEasing({
      degree: this._degree,
      direction: this._direction,
      start: this.time.start,
      end: this.time.end,
      from: this.output.from,
      to: this.output.to
    });
  }

  private calculate(x: number){
    return transform(a => 1-Math.sqrt(1-a**this._degree), this._direction, x);
  }
}