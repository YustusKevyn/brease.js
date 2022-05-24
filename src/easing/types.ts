export type Function = (x: number) => number;
export type Direction = "in" | "out" | "inOut" | "outIn";

export interface BaseConfiguration {
  start?: number | undefined;
  end?: number | undefined;
  from?: number | undefined;
  to?: number | undefined;
}