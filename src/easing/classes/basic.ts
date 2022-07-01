import type { BaseConfiguration, Direction, Function } from "../types";

import { Easing } from "../easing";
import { transform } from "../../util";

export interface BasicEasingConfiguration extends BaseConfiguration {
  fn: Function;
  direction?: Direction | undefined;
};

export class BasicEasing extends Easing {
  private _fn: Function = x => x;
  private _direction: Direction = "in";

  constructor(config?: BasicEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.fn) this._fn = config.fn;
    if(config?.direction) this._direction = config.direction;
  }

  get fn(){ return this._fn; }
  get direction(){ return this._direction; }

  clone(config?: Partial<BasicEasingConfiguration>){
    return new BasicEasing({
      fn: this._fn,
      direction: this._direction,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end,
      ...config
    });
  }

  protected calculate(x: number){
    return transform.direction(this._fn, this._direction, x);
  }
}