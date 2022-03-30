import type { Name } from "./utils";
import type { Function } from "../types";

import elastic from "../elastic/function";
import { directions, names, toInOut, toOut, toOutIn } from "./utils";

let baseElastic = elastic(1, 0.3), baseElasticDouble = elastic(1, 0.45),
base: Record<Exclude<Name, "Elastic">, Function> = {
  Quad: t => t**2,
  Cubic: t => t**3,
  Quart: t => t**4,
  Quint: t => t**5,
  Expo: t => t === 0 ? 0 : 2**(10*t-10),
  Sine: t => 1-Math.cos(t*Math.PI/2),
  Circ: t => 1-Math.sqrt(1-t**2),
  Back: t => t**2*(2.70158*t-1.70158)
};

let library: Record<string, Function> = {};
for(let n of names){
  for(let d of directions){
    let b: Function;
    if(n === "Elastic") b = d === "in" || d === "out" ? baseElastic : baseElasticDouble;
    else b = base[n];

    let fn: Function = b;
    if(d === "out") fn = toOut(b);
    if(d === "inOut") fn = toInOut(b);
    if(d === "outIn") fn = toOutIn(b);
    library[d+n] = fn;
  }
}

export default library;