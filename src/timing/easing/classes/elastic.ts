import type { Direction } from "../types";

import { Easing } from "../easing";
import { math } from "../../../util";
import { transform } from "../util/transform";

export interface ElasticEasingConfiguration {
  period?: number | undefined;
  amplitude?: number | undefined;
  direction?: Direction | undefined;
}

export class ElasticEasing extends Easing {
  private _period: number = 0.3;
  private _amplitude: number = 1;
  private _direction: Direction = "in";

  constructor(config?: ElasticEasingConfiguration){
    super();
    if(config?.period !== undefined) this._period = math.limitMin(config.period, 0.1);
    if(config?.amplitude !== undefined) this._amplitude = math.limitMin(config.amplitude, 1);
    if(config?.direction !== undefined) this._direction = config.direction;
  }

  get period(){ return this._period; }
  get amplitude(){ return this._amplitude; }
  get direction(){ return this._direction; }

  clone(config?: ElasticEasingConfiguration){
    return new ElasticEasing({
      period: this._period,
      amplitude: this._amplitude,
      direction: this._direction,
      ...config
    });
  }

  protected calculate(x: number){
    return transform(a => {
      let s = this._period/(Math.PI*2)*Math.asin(1/this._amplitude);
      return -this._amplitude*2**(10*(a-1)) * Math.sin((a-1-s)*(2*Math.PI)/this._period);
    }, this._direction, x);
  }
}