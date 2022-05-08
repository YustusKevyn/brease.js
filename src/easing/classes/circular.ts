import type { Arguments, Direction } from "../types";

import { transform } from "../function";
import { BaseEasing } from "./base";

export class CircularEasing extends BaseEasing {
  constructor(degree: number = 2, direction: Direction = "in", ...args: Arguments){
    super(CircularEasing.fn(degree, direction), ...args);
  }

  static fn(degree: number = 2, direction: Direction = "in"){
    if(degree < 1) degree = 1;
    return transform(t => t === 1 || t === 0 ? t : 1-Math.sqrt(1-t**degree), direction);
  }
}