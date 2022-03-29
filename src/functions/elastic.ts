import type { Args, Function } from "../types";

import Easing from "../easing";
import { toInOut, toOut, toOutIn } from "../util";

export default class Elastic extends Easing{
  constructor(amplitude = 1, period = 0.3, direction: "in" | "out" | "inOut" | "outIn" = "in", ...args: Args){
    if(amplitude < 1) amplitude = 1;

    let fn: Function = elastic(amplitude, period);
    if(direction === "out") fn = toOut(fn);
    else if(direction === "inOut") fn = toInOut(fn);
    else if(direction === "outIn") fn = toOutIn(fn);
    else if(direction !== "in") throw new Error("invalid direction");

    super(fn, ...args);
  }
};

/**
 * Function
 */
export function elastic(a: number, p: number): Function{
  let s = p/(Math.PI*2)*Math.asin(1/a);
  return t => t === 1 || t === 0 ? t : -a*2**(10*(t-1)) * Math.sin((t-1-s)*(2*Math.PI)/p);
};