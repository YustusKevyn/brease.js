import type { Function, Param } from "./types";

import Time from "./time";
import Library from "./library";
import Progress from "./progress";

export default class Easing{
  private _fn: Function;

  readonly time: Time;
  readonly progress: Progress;

  constructor(fn: Param = "linear", t1 = 0, t2 = 1, p1 = 0, p2 = 1){
    this._fn = typeof fn === "string" ? Library[fn] : fn;
    this.time = new Time(t1, t2);
    this.progress = new Progress(p1, p2);
  };

  get fn(): Function{
    return x => this.at(x);
  };

  /**
   * Returns the progress at the specified time 
   * @param t 
   * @returns progress 
   */
  at(t: number){
    let x = this.normalise((t-this.time.start)/this.time.duration), y = this._fn(x);
    return this.progress.start+y*this.progress.delta;
  };

  /**
   * Returns an array of n keyframes 
   * @param n 
   */
  keyframes(n: number){
    let final: number[] = [];
    for(let i = 0; i < n; i++){
      let x = this.time.start+this.time.duration/(n-1)*i;
      final.push(this.at(x));
    }
    return final;
  };

  /**
   * Inverts the easing 
   */
  invert(){
    let {start, end} = this.time;
    this.time.end = start;
    this.time.start = end;
  };

  /**
   * Clones the easing 
   * @returns easing 
   */
  clone(){
    return new Easing(this._fn, ...this.time.range, ...this.progress.range);
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