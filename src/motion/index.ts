import type { Timing } from "../timing";
import type { Configuration } from "./types";

export class Motion {
  private _timing: Timing;

  private _from: number = 0;
  private _to: number = 1;
  private _delta: number;
  
  private _start: number = 0;
  private _end: number = 1;
  private _duration: number;

  constructor(timing: Timing, config: Configuration){
    this._timing = timing;

    if(config.start !== undefined) this._start = config.start;
    if(config.end !== undefined) this._end = config.end;
    this._duration = this._end-this._start;

    if(config.from !== undefined) this._from = config.from;
    if(config.to !== undefined) this._to = config.to;
    this._delta = this._to-this._from;
  }

  get from(){ return this._from; }
  get to(){ return this._to; }
  get delta(){ return this._delta; }

  get start(){ return this._start; }
  get end(){ return this._end; }
  get duration(){ return this._duration; }

  at(t: number){
    return this._from+this._timing.at((t-this._start)/this._duration)*this._delta;
  }

  keyframes(n: number){
    return this._timing.keyframes(n).map(v => this._from+v*this._delta);
  }
}

export type {
  Configuration as MotionConfiguration
}