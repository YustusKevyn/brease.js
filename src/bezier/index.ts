import type { Args } from "../types";

import Easing from "../easing";
import bezier from "./function";

export default class Bezier extends Easing{
  constructor(x1: number, y1: number, x2: number, y2: number, ...agrs: Args){
    if(!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) throw new Error("invalid points");
    super(bezier(x1, y1, x1, y2), ...agrs);
  }
}