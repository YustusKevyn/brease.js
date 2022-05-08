import type { Arguments, Direction } from "../types";

import { transform } from "../function";
import { BaseEasing } from "./base";

export class PolynomialEasing extends BaseEasing {
  constructor(degree: number = 2, direction: Direction = "in", ...args: Arguments){
    super(PolynomialEasing.fn(degree, direction), ...args);
  }

  static fn(degree: number = 2, direction: Direction = "in"){
    if(degree < 1) degree = 1;
    return transform(t => t === 1 || t === 0 ? t : t**degree, direction);
  }
}