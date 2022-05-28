import type { BaseConfiguration, Direction } from "../types";

import { Easing } from "./easing";
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
    if(config?.degree) this.degree = config.degree;
    if(config?.direction) this.direction = config.direction;
  }

  get degree(){
    return this._degree;
  }
  set degree(value: number){
    this._degree = math.limitMin(value, 1);
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
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end
    });
  }

  protected calculate(x: number){
    return transform.direction(a => 1-Math.sqrt(1-a**this._degree), this._direction, x);
  }
}