import type Library from "./library";
type Library = typeof Library;

export type Name = keyof Library;
export type Param = Name | Function;
export type Range = [start: number, end: number];
export type Function = (t: number) => number;