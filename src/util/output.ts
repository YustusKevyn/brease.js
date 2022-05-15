import { limit } from "../easing/util/math";

type Range = [from: number, to: number];

export class Output {
  private _x1: number;
  private _x2: number;

  constructor(from: number = 0, to: number = 1){
    this._x1 = from;
    this._x2 = to;
  }

  get from(){
    return this._x1;
  }
  set from(value: number){
    this._x1 = value;
  }

  get to(){
    return this._x2;
  }
  set to(value: number){
    this._x2 = value;
  }

  get delta(){
    return this._x2-this._x1;
  }
  set delta(value: number){
    this._x2 = this._x1+value;
  }

  get range(): Range {
    return [this._x1, this._x2];
  }
  set range(value: Range){
    this._x1 = value[0];
    this._x2 = value[1];
  }

  toRelative(value: number){
    value -= this._x1;
    value /= this._x2-this._x1;
    return limit(value, 0, 1);
  }

  toAbsolute(value: number){
    value *= this._x2-this._x1;
    value += this._x1;
    return value;
  }
}