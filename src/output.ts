import type { Range } from "./types";

export default class Output{
  private _end: number;
  private _start: number;

  constructor(start: number = 0, end: number = 1){
    this._end = end;
    this._start = start;
  }

  get start(){
    return this._start
  }
  set start(value: number){
    this._start = value;
  }
  
  get end(){
    return this._end;
  }
  set end(value: number){
    this._end = value;
  }

  get delta(){
    return this._end-this._start;
  }
  set delta(value: number){
    this._end = this._start+value;
  }

  get range(): Range{
    return [this._start, this._end];
  }
  set range(value: Range){
    this._end = value[1];
    this._start = value[0];
  }
}