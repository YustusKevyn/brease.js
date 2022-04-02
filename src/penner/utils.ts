import type { Function } from "../types";

// Name 
export const names = ["Quad", "Cubic", "Quart", "Quint", "Expo", "Sine", "Circ", "Back", "Elastic"] as const;
export type Name = (typeof names)[number];

// Direction 
export const directions = ["in", "out", "inOut", "outIn"] as const;
export type Direction = (typeof directions)[number];

// Transform 
export function toOut(fn: Function): Function{
  return t => 1-fn(1-t);
}
export function toInOut(fn: Function): Function{
  return t => t < 0.5 ? fn(t*2)/2 : 1-fn(t*-2+2)/2;
}
export function toOutIn(fn: Function): Function{
  return t => t < 0.5 ? (1-fn(1-t*2))/2 : (fn(t*2-1)+1)/2;
}