import type { Arguments, Direction } from "../types";

import { Easing } from "./easing";
import { transform } from "../util/function";

export interface CircularEasingConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class CircularEasing extends Easing {
  constructor(configuration: CircularEasingConfiguration, ...args: Arguments){
    super(CircularEasing.fn(configuration.degree, configuration.direction), ...args);
  }

  static fn(degree: number = 2, direction: Direction = "in"){
    if(degree < 1) degree = 1;
    return transform(t => t === 1 || t === 0 ? t : 1-Math.sqrt(1-t**degree), direction);
  }
}