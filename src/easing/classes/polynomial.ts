import type { Arguments, Direction } from "../types";

import { Easing } from "./easing";
import { transform } from "../util/function";

export interface PolynomialEasingConfiguration {
  degree?: number | undefined;
  direction?: Direction | undefined;
}

export class PolynomialEasing extends Easing {
  constructor(configuration: PolynomialEasingConfiguration, ...args: Arguments){
    super(PolynomialEasing.fn(configuration.degree, configuration.direction), ...args);
  }

  static fn(degree: number = 2, direction: Direction = "in"){
    if(degree < 1) degree = 1;
    return transform(t => t === 1 || t === 0 ? t : t**degree, direction);
  }
}