import type { Args } from "../types";

import Easing from "../easing";

export default class Steps extends Easing{
  constructor(number: number, direction: Direction = "end", ...args: Args){
    if(!(direction in library)) throw new Error("unknown direction");
    super(t => t === 0 || t === 1 ? t : library[direction](t, number), ...args);
  };
};

/**
 * Library 
 */
export type Direction = "start" | "end" | "none" | "both";
type Function = (t: number, n: number) => number;

export let library: Record<Direction, Function> = {
  start: (t, n) => Math.ceil(t*n)/n,
  end: (t, n) => Math.floor(t*n)/n,
  none: (t, n) => Math.floor(t*n)/(n-1),
  both: (t, n) => Math.floor(t*n+1)/(n+1)
} as const;

let easing = new Steps(3, "end");
easing.output.range = [0, 100];