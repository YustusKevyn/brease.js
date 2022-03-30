import type { Args } from "../types";
import type { Direction, Name } from "./utils";

import Easing from "../easing";
import library from "./library";

export default class Penner extends Easing{
  constructor(name: `${Direction}${Name}`, ...args: Args){
    if(!(name in library)) throw new Error("unknown function");
    super(library[name], ...args);
  };
};