import { limit } from "../util/math";

type Range = [start: number, end: number];

export class Time {
  private _t1: number;
  private _t2: number;

  constructor(start: number = 0, end: number = 1){
    this._t1 = start;
    this._t2 = end;
  }

  get start(){
    return this._t1;
  }
  set start(value: number){
    this._t1 = value;
  }

  get end(){
    return this._t2;
  }
  set end(value: number){
    this._t2 = value;
  }

  get duration(){
    return this._t2-this._t1;
  }
  set duration(value: number){
    this._t2 = this._t1+value;
  }

  get range(): Range {
    return [this._t1, this._t2];
  }
  set range(value: Range){
    this._t1 = value[0];
    this._t2 = value[1];
  }

  toRelative(value: number){
    value -= this._t1;
    value /= this._t2-this._t1;
    return limit(value, 0, 1);
  }

  toAbsolute(value: number){
    value *= this._t2-this._t1;
    value += this._t1;
    return limit(value, this._t1, this._t2);
  }
}