import type { Function } from "./types";

type Name = "Quad" | "Cubic" | "Quart" | "Quint" | "Expo" | "Sine" | "Circ" | "Back";
const base: Record<Name, Function> = {
  Quad: t => t**2,
  Cubic: t => t**3,
  Quart: t => t**4,
  Quint: t => t**5,
  Expo: t => t === 0 ? 0 : 2**(10*t-10),
  Sine: t => 1-Math.cos(t*Math.PI/2),
  Circ: t => 1-Math.sqrt(1-t**2),
  Back: t => 2.70158*t**3-1.70158*t**2
} as const;

let library: Record<string, Function> = {};
for(let name in base){
  let fn = base[name as Name];
  library["in"+name] = fn;
  library["out"+name] = t => 1-fn(1-t);
  library["inOut"+name] = t => t < 0.5 ? fn(t*2)/2 : 1-fn(t*-2+2)/2;
  library["outIn"+name] = t => t < 0.5 ? (1-fn(1-t*2))/2 : (fn(t*2-1)+1)/2;
}

export default library as Record<`${"in" | "out" | "inOut" | "outIn"}${Name}` | "linear", Function>;