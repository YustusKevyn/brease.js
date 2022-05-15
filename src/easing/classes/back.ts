import type { Arguments, Direction } from "../types";

import { Easing } from "./easing";
import { transform } from "../util/function";

export interface BackEasingConfiguration {
  overshoot?: number | undefined;
  direction?: Direction | undefined;
}

export class BackEasing extends Easing {
  constructor(configuration: BackEasingConfiguration, ...args: Arguments){
    super(BackEasing.fn(configuration.overshoot, configuration.direction), ...args);
  }

  static fn(overshoot: number = 1.5, direction: Direction = "in"){
    if(overshoot < 1) overshoot = 1;
    return transform(t => {
      if(t === 1 || t === 0) return t;
      return t**2*((overshoot+1)*t-overshoot);
    }, direction);
  }
}