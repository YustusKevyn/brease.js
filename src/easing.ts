import type { Args, Function, Param } from "./types";

import Time from "./time";
import Output from "./output";
import libary from "./library";

export default class Easing{
  private _fn: Function;

  readonly time: Time;
  readonly output: Output;

  constructor(easing: Param = "linear", ...args: Args){
    let fn: Function;

    if(typeof easing === "string"){
      if(!(easing in libary)) throw new Error("unknown easing");
      fn = libary[easing];
    }
    else if(typeof easing === "function") fn = easing;
    else throw new Error("invalid easing");

    let [t1, t2, o1, o2] = args;
    this._fn = fn;
    this.time = new Time(t1, t2);
    this.output = new Output(o1, o2);
  };

  get fn(): Function{
    return t => this.at(t);
  };

  /**
   * Returns the output at the specified time 
   * @param t 
   * @returns output 
   */
  at(t: number){
    let x = this.normalise((t-this.time.start)/this.time.duration), y = this._fn(x);
    return this.output.start+y*this.output.delta;
  };

  /**
   * Returns the difference of the outputs at the specified times 
   * @param t1 
   * @param t2 
   * @returns 
   */
  delta(t1: number, t2: number){
    return this.at(t2)-this.at(t1);
  };

  /**
   * Returns an array of n keyframes 
   * @param n 
   */
  keyframes(n: number){
    let final: number[] = [this.at(this.time.start)];
    for(let i = 1; i < n-1; i++){
      let x = this.time.start+this.time.duration/(n-1)*i;
      final.push(this.at(x));
    }
    final.push(this.at(this.time.end));
    return final;
  };

  /**
   * Inverts the easing 
   */
  invert(){
    let {start, end} = this.output;
    this.output.end = start;
    this.output.start = end;
  };

  /**
   * Clones the easing 
   * @returns easing 
   */
  clone(){
    return new Easing(this._fn, ...this.time.range, ...this.output.range);
  };

  /**
   * Normalises the specified time 
   * @param t 
   * @returns normalised time 
   */
  private normalise(t: number){
    return t < 0 ? 0 : t > 1 ? 1 : t;
  };
};