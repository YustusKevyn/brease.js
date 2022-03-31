import type { Args, Function } from "../types";
import type { Direction } from "../penner/utils";

import Easing from "../easing";
import elastic from "./function";
import { toInOut, toOut, toOutIn } from "../penner/utils";

export default class Elastic extends Easing{
  constructor(amplitude = 1, period = 0.3, direction: Direction = "in", ...args: Args){
    if(amplitude < 1) amplitude = 1;
    if(period <= 0) period = 0.3;

    let fn: Function = elastic(amplitude, period);
    if(direction === "out") fn = toOut(fn);
    else if(direction === "inOut") fn = toInOut(fn);
    else if(direction === "outIn") fn = toOutIn(fn);
    else if(direction !== "in") throw new Error("invalid direction");

    super(fn, ...args);
  };
};