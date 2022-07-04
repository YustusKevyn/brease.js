import type { Direction, Function } from "../types";

import { Easing } from "../easing";
import { transform } from "../util/transform";

export interface BasicEasingConfiguration {
  fn?: Function | undefined;
  direction?: Direction | undefined;
}

export class BasicEasing extends Easing {
  private _fn: Function = x => x;
  private _direction: Direction = "in";

  constructor(config?: BasicEasingConfiguration){
    super();
    if(config?.fn !== undefined) this._fn = config.fn;
    if(config?.direction !== undefined) this._direction = config.direction;
  }

  get fn(){ return this._fn; }
  get direction(){ return this._direction; }

  clone(config?: BasicEasingConfiguration){
    return new BasicEasing({
      fn: this._fn,
      direction: this._direction,
      ...config
    });
  }

  protected calculate(x: number){
    return transform(this._fn, this._direction, x);
  }
}