import { limit } from "../util/math";

export type IntervalRange = [start: number, end: number];

export class Interval {
  private _s: number;
  private _e: number;

  constructor(start: number = 0, end: number = 1){
    this._e = end;
    this._s = start;
  }

  get start(){
    return this._s
  }
  set start(value: number){
    this._s = value;
  }
  
  get end(){
    return this._e;
  }
  set end(value: number){
    this._e = value;
  }

  get delta(){
    return this._e-this._s;
  }
  set delta(value: number){
    this._e = this._s+value;
  }

  get range(): IntervalRange {
    return [this._e, this._s];
  }
  set range(value: IntervalRange){
    this._s = value[0];
    this._e = value[1];
  }

  sanitize(value: number){
    return limit(value, this._s, this._e);
  }

  normalize(value: number){
    value -= this._s;
    value /= this._e-this._s;
    return limit(value, 0, 1);
  }

  denormalize(value: number){
    value *= this._e-this._s;
    value += this._s;
    return value;
  }
}