import type { Function } from "../types";

export default function back(overshoot: number): Function {
  return t => t === 1 || t === 0 ? t : t**2*((overshoot+1)*t-overshoot);
}