import type { Function } from "./types";

import steps from "./steps/function";
import bezier from "./bezier/function";
import penner from "./penner/library";

let libary: Record<string, Function> = {
  linear: t => t,
  ease: bezier(0.25, 0.1, 0.25, 1.0),
  easeIn: bezier(0.42, 0.0, 1.0, 1.0),
  easeOut: bezier(0.0, 0.0, 0.58, 1.0),
  easeInOut: bezier(0.42, 0.0, 0.58, 1.0),
  stepEnd: steps(1, "end"),
  stepStart: steps(1, "start")
};
for(let name in penner) libary["ease"+name[0].toUpperCase()+name.slice(1)] = penner[name];
export default libary;