import { math } from "../util";

export class Time {
  private _start: number;
  private _end: number;

  constructor(start: number = 0, end: number = 1){
    this._start = start;
    this._end = end;
  }

  get start(){ return this._start; }
  get end(){ return this._end; }
  get duration(){ return this._end-this._start; }

  toRelative(value: number){
    value -= this._start;
    value /= this._end-this._start;
    return math.limit(value, 0, 1);
  }

  toAbsolute(value: number){
    value *= this._end-this._start;
    value += this._start;
    return math.limit(value, this._start, this._end);
  }
}