import type { Interval } from "../util/interval";

export type Function = (time: number) => number;
export type Arguments = [o1?: number, o2?: number, i1?: number, i2?: number];
export type Direction = "in" | "out" | "inOut" | "outIn";

export interface Easing {
  readonly input: Interval;
  readonly output: Interval;

  at(t: number): number;
  clone(): Easing;
  delta(t1: number, t2: number): number;
  keyframes(n: number): number[];
}