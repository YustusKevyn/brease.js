import type { Function } from "../types";

export default function elastic(a: number, p: number): Function{
  let s = p/(Math.PI*2)*Math.asin(1/a);
  return t => t === 1 || t === 0 ? t : -a*2**(10*(t-1)) * Math.sin((t-1-s)*(2*Math.PI)/p);
};