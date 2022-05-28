import type { Direction, Function } from "../easing/types";

export function direction(fn: Function, direction: Direction, x: number): number {
  if(x === 0 || x === 1) return x;
  if(direction === "out") return 1-fn(1-x);
  if(direction === "inOut") return x < 0.5 ? fn(x*2)/2 : 1-fn(x*-2+2)/2;
  if(direction === "outIn") return x < 0.5 ? (1-fn(1-x*2))/2 : (fn(x*2-1)+1)/2;
  return fn(x);
}