import type { Arguments, Direction } from "../types";

import { Easing } from "./easing";
import { transform } from "../util/function";

export interface SinusodialEasingConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class SinusodialEasing extends Easing {
  constructor(configuration: SinusodialEasingConfiguration, ...args: Arguments){
    super(SinusodialEasing.fn(configuration.degree, configuration.direction), ...args);
  }

  static fn(degree: number = 1, direction: Direction = "in"){
    if(degree < 1) degree = 1;
    return transform(t => t === 1 || t === 0 ? t : 1-Math.cos(t*Math.PI/2)**(1/degree), direction);
  }
}