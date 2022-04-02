import type { Function } from "../types";
import type { Direction } from "./utils";

export default function steps(n: number, d: Direction): Function{
  if(d === "start") return t => t === 1 || t === 0 ? t : Math.ceil(t*n)/n;
  if(d === "end") return t => t === 1 || t === 0 ? t : Math.floor(t*n)/n;
  if(d === "both") return t => t === 1 || t === 0 ? t : Math.floor(t*n+1)/(n+1);
  return t => t === 1 || t === 0 ? t : Math.floor(t*n)/(n-1);
}