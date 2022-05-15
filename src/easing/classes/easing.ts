import type { Arguments, Function } from "../types";

import { Time } from "../../util/time";
import { Output } from "../../util/output";

export class Easing {
  readonly fn: Function;
  readonly time: Time;
  readonly output: Output;

  constructor(fn: Function, ...args: Arguments){
    let [from, to, start, end] = args;
    this.fn = fn;
    this.time = new Time(start, end);
    this.output = new Output(from, to);
  }

  at(t: number){
    return this.output.toAbsolute(this.fn(this.time.toRelative(t)));
  }

  clone(){
    return new Easing(this.fn, this.output.from, this.output.to, this.time.start, this.time.end);
  }

  delta(t1: number, t2: number){
    return this.at(t2)-this.at(t1);
  }

  keyframes(n: number){
    let final: number[] = [this.at(this.time.start)];
    for(let i = 1; i < n-1; i++){
      let x = this.time.start+this.time.duration/(n-1)*i;
      final.push(this.at(x));
    }
    final.push(this.at(this.time.end));
    return final;
  }
}