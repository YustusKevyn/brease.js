import type { Function } from "./types";

export function toOut(fn: Function): Function{
  return t => 1-fn(1-t);
};

export function toInOut(fn: Function): Function{
  return t => t < 0.5 ? fn(t*2)/2 : 1-fn(t*-2+2)/2;
};

export function toOutIn(fn: Function): Function{
  return t => t < 0.5 ? (1-fn(1-t*2))/2 : (fn(t*2-1)+1)/2;
};