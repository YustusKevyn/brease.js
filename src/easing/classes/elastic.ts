import type { Arguments, Direction } from "../types";

import { transform } from "../function";
import { BaseEasing } from "./base";

export class ElasticEasing extends BaseEasing {
  constructor(amplitude: number = 1, period: number = 0.3, direction: Direction = "in", ...args: Arguments){
    super(ElasticEasing.fn(amplitude, period, direction), ...args);
  }

  static fn(amplitude: number = 1, period: number = 0.3, direction: Direction = "in"){
    if(amplitude < 1) amplitude = 1;
    if(period < 0.1) period = 0.1;

    let s = period/(Math.PI*2)*Math.asin(1/amplitude);
    return transform(t => {
      if(t === 1 || t === 0) return t;
      return -amplitude*2**(10*(t-1)) * Math.sin((t-1-s)*(2*Math.PI)/period);
    }, direction);
  }
}