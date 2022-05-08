import type { Arguments, Direction } from "../types";

import { transform } from "../function";
import { BaseEasing } from "./base";

export class SinusodialEasing extends BaseEasing {
  constructor(degree: number = 1, direction: Direction = "in", ...args: Arguments){
    super(SinusodialEasing.fn(degree, direction), ...args);
  }

  static fn(degree: number = 1, direction: Direction = "in"){
    if(degree < 1) degree = 1;
    return transform(t => t === 1 || t === 0 ? t : 1-Math.cos(t*Math.PI/2)**(1/degree), direction);
  }
}