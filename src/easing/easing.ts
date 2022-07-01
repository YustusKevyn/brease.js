import { Time } from "../helpers/time";
import { Output } from "../helpers/output";

export abstract class Easing {
  private _time: Time;
  private _output: Output;

  abstract clone(): Easing;
  protected abstract calculate(x: number): number;

  constructor(from?: number, to?: number, start?: number, end?: number){
    this._time = new Time(start, end);
    this._output = new Output(from, to);
  }

  get time(){ return this._time; }
  get output(){ return this._output; }

  at(t: number){
    return this._output.toAbsolute(this.calculate(this._time.toRelative(t)));
  }

  delta(t1: number, t2: number){
    return Math.abs(this.at(t2)-this.at(t1));
  }

  keyframes(n: number){
    let final: number[] = [this._output.from];
    for(let i = 1; i < n-1; i++){
      let x = this._time.start+this._time.duration/(n-1)*i;
      final.push(this.at(x));
    }
    final.push(this._output.to);
    return final;
  }
}