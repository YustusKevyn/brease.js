import type { Arguments, Direction, Function } from "../types";

import { Easing } from "./easing";
import { transform } from "../util/function";

export interface BasicEasingConfiguration {
  fn: Function;
  direction?: Direction | undefined;
}

export class BasicEasing extends Easing {
  constructor(configuration: BasicEasingConfiguration, ...args: Arguments){
    super(transform(configuration.fn, configuration.direction ?? "in"), ...args);
  }
}