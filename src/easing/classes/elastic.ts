import type { Arguments, Direction } from "../types";

import { Easing } from "./easing";
import { transform } from "../util/function";

export interface ElasticEasingConfiguration {
  period?: number | undefined;
  amplitude?: number | undefined;
  direction?: Direction | undefined;
}

export class ElasticEasing extends Easing {
  constructor(configuration: ElasticEasingConfiguration, ...args: Arguments){
    super(ElasticEasing.fn(configuration.amplitude, configuration.period, configuration.direction), ...args);
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