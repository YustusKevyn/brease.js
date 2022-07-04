import { Timing } from "../timing";

export abstract class Easing extends Timing {
  abstract clone(): Easing;
}