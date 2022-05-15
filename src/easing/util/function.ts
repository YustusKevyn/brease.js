import type { Direction, Function } from "../types";

export function transform(fn: Function, dir: Direction): Function {
  if(dir === "out") return t => 1-fn(1-t);
  if(dir === "inOut") return t => t < 0.5 ? fn(t*2)/2 : 1-fn(t*-2+2)/2;
  if(dir === "outIn") return t => t < 0.5 ? (1-fn(1-t*2))/2 : (fn(t*2-1)+1)/2;
  return fn;
}