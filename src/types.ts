import type { Direction as PennerDirection, Name as PennerName } from "./penner/utils";

export type Args = [t1?: number, t2?: number, o1?: number, o2?: number];
export type Range = [start: number, end: number];
export type Param = Function | Name;
export type Function = (t: number) => number;
export type Name = 
  | `ease${Capitalize<PennerDirection>}${PennerName}`
  | "linear"
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "stepEnd"
  | "stepStart";