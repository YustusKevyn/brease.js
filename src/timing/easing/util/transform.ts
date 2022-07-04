import type { Direction, Function } from "../types";

export function transform(fn: Function, dir: Direction, x: number): number {
  if(dir === "out") return 1-fn(1-x);
  if(dir === "inOut") return x < 0.5 ? fn(x*2)/2 : 1-fn(x*-2+2)/2;
  if(dir === "outIn") return x < 0.5 ? (1-fn(1-x*2))/2 : (fn(x*2-1)+1)/2;
  return fn(x);
}