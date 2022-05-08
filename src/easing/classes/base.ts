import type { Arguments, Easing } from "../types";

import { Interval } from "../../util/interval";

export class BaseEasing implements Easing {
  private _f: Function;

  readonly input: Interval;
  readonly output: Interval;

  constructor(fn: Function, ...args: Arguments){
    let [o1, o2, i1, i2] = args;
    this._f = fn;
    this.input = new Interval(i1, i2);
    this.output = new Interval(o1, o2);
  }

  at(t: number){
    return this.output.denormalize(this._f(this.input.normalize(t)));
  }

  clone(){
    return new BaseEasing(this._f, ...this.output.range, ...this.input.range);
  }

  delta(t1: number, t2: number){
    return this.at(t2)-this.at(t1);
  }

  keyframes(n: number){
    let final: number[] = [this.at(this.input.start)];
    for(let i = 1; i < n-1; i++){
      let x = this.input.start+this.input.delta/(n-1)*i;
      final.push(this.at(x));
    }
    final.push(this.at(this.input.end));
    return final;
  }
}