import type { Configuration, Precision } from "./types";

import { math } from "../util";
import { Time } from "../helpers/time";
import { Output } from "../helpers/output";

export enum SpringBehavior {
  Underdamped,
  CriticallyDamped,
  Overdamped
};

export class Spring {
  private _time: Time;
  private _output: Output;

  private _m: number = 1;
  private _k: number = 100;

  private _v_0: number = 0;
  private _v_e: number = 0;

  private _c: number = 0;
  private _c_c: number;
  private _z: number;

  private _w_d: number;
  private _w_0: number;

  private _y_e: number = 1e-3;

  private _clamp: boolean = false;
  private _bounce: boolean = false;

  constructor(config?: Configuration){
    this._output = new Output(config?.from, config?.to);

    // Config
    if(config?.mass) this._m = math.limitMin(config.mass, 0.1);
    if(config?.damping) this._c = math.limitMin(config.damping, 1);
    if(config?.velocity) this._v_0 = config.velocity;
    if(config?.stiffness) this._k = math.limitMin(config.stiffness, 1);
    if(config?.clamp) this._clamp = config.clamp;
    if(config?.bounce) this._bounce = config.bounce;

    // Precision
    if(config?.precision){
      let precision: Precision = typeof config?.precision === "number" ? {distance: config.precision} : config?.precision;
      if(precision.distance) this._y_e = math.limitMin(precision.distance, 1e-10);
      if(precision.velocity) this._v_e = math.limitMin(precision.velocity, 1e-10);
    }
    if(!this._v_e) this._v_e = this._y_e/10;

    // Damping
    this._c_c = 2*Math.sqrt(this._k*this._m);
    this._z = this._c/this._c_c;
    
    // Frequency
    this._w_0 = Math.sqrt(this._k/this._m);
    if(this._z < 1) this._w_d = this._w_0*Math.sqrt(1-this._z**2);
    else if(this._z > 1) this._w_d = this._w_0*Math.sqrt(this._z**2-1);
    else this._w_d = 0;

    // Duration
    let t = 0, v = this._v_0, y = 1;
    while(t++ < 1e5 && !this._clamp ? Math.abs(v) > this._v_e || Math.abs(y) > this._y_e : y > 0){
      y += v += (-this._k*1e-6*y - this._c*1e-3*v)/this._m;
    }

    // Domain
    if(config?.start) this._time = new Time(config.start, config.start+t);
    else if(config?.end) this._time = new Time(config.end-t, config?.end);
    else this._time = new Time(0, t);
  }

  get time(){ return this._time; }
  get output(){ return this._output; }

  get mass(){ return this._m; }
  get damping(){ return this._c; }
  get velocity(){ return this._v_0; }
  get stiffness(){ return this._k; }

  get dampingRatio(){ return this._z; }
  get naturalFrequency(){ return this._w_0; }
  get dampedNaturalFrequency(){ return this._w_d; }

  get behavior(): SpringBehavior {
    if(this._z < 1) return SpringBehavior.Underdamped;
    if(this._z > 1) return SpringBehavior.Overdamped;
    return SpringBehavior.CriticallyDamped;
  }

  at(t: number){
    t -= this.time.start;
    if(t < 0) return 0;
    if(t > this.time.duration) return this.output.to;

    let y = this.calculate(t/1000);
    if(this._bounce) y = Math.abs(y);
    return this._output.toAbsolute(1-y);
  }

  clone(config?: Partial<Configuration>){
    return new Spring({
      start: this._time.start,
      end: this._time.end,
      from: this._output.from,
      to: this._output.to,
      mass: this._m,
      damping: this._c,
      velocity: this._v_0,
      stiffness: this._k,
      clamp: this._clamp,
      bounce: this._bounce,
      precision: {
        distance: this._y_e,
        velocity: this._v_e
      },
      ...config
    });
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

  calculate(t: number){
    // Underdamped
      if(this._z < 1){
      let decay = Math.E**(-this._z*this._w_0*t),
      sin = (this._v_0+this._z*this._w_0)/this._w_d*Math.sin(this._w_d*t),
      cos = Math.cos(this._w_d*t);
      return decay*(sin+cos);
    }

    // Overdamped
    else if(this._z > 1){
      let decay = Math.E**((this._w_d+this._z*this._w_0)*t),
      amp1 = (this._w_d+this._z*this._w_0+this._v_0)/(2*this._w_d),
      amp2 = (this._w_d-this._z*this._w_0-this._v_0)/(2*this._w_d);
      return amp1*decay+amp2/decay;
    }

    // Critically damped
    else {
      let decay = Math.E**(-this._w_0*t);
      return decay+(this._v_0+this._w_d)*t*decay;
    }
  }
}

export type {
  Configuration as SpringConfiguration
}