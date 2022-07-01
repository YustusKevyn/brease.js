import { math } from "../util";

export class Output {
  private _from: number;
  private _to: number;

  constructor(from: number = 0, to: number = 1){
    this._from = from;
    this._to = to;
  }

  get from(){ return this._from; }
  get to(){ return this._to; }
  get delta(){ return this._to-this._from; }

  toRelative(value: number){
    value -= this._from;
    value /= this._to-this._from;
    return math.limit(value, 0, 1);
  }

  toAbsolute(value: number){
    value *= this._to-this._from;
    value += this._from;
    return value;
  }
}