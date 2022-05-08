import type { Arguments, Direction } from "../types";

import { transform } from "../function";
import { BaseEasing } from "./base";

export class BackEasing extends BaseEasing {
  constructor(overshoot: number = 1.5, direction: Direction = "in", ...args: Arguments){
    super(BackEasing.fn(overshoot, direction), ...args);
  }

  static fn(overshoot: number = 1.5, direction: Direction = "in"){
    if(overshoot < 1) overshoot = 1;
    return transform(t => {
      if(t === 1 || t === 0) return t;
      return t**2*((overshoot+1)*t-overshoot)
    }, direction);
  }
}