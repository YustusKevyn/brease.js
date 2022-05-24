import type { Direction, BaseConfiguration, Function } from "../types";

import { Easing } from "./easing";
import { lowerLimit } from "../../util/math";
import { transform } from "../../util/function";

export interface ElasticEasingConfiguration extends BaseConfiguration {
  period?: number | undefined;
  amplitude?: number | undefined;
  direction?: Direction | undefined;
}

export class ElasticEasing extends Easing {
  private _period: number = 0.3;
  private _amplitude: number = 1;
  private _direction: Direction = "in";

  constructor(config?: ElasticEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.period) this.period = config.period;
    if(config?.amplitude) this.amplitude = config.amplitude;
    if(config?.direction) this.direction = config.direction;
  }

  get period(){
    return this._period;
  }
  set period(value: number){
    this._period = lowerLimit(value, 0.1);
  }

  get amplitude(){
    return this._amplitude;
  }
  set amplitude(value: number){
    this._amplitude = lowerLimit(value, 1);
  }

  get direction(){
    return this._direction;
  }
  set direction(value: Direction){
    this._direction = value;
  }

  clone(){
    return new ElasticEasing({
      period: this._period,
      amplitude: this._amplitude,
      direction: this._direction,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end
    });
  }

  protected calculate(x: number){
    return transform(a => {
      let s = this._period/(Math.PI*2)*Math.asin(1/this._amplitude);
      return -this._amplitude*2**(10*(a-1)) * Math.sin((a-1-s)*(2*Math.PI)/this._period);
    }, this._direction, x);
  }
}