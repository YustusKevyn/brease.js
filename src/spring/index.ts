import { Behavior, Configuration } from "./types";

import { math } from "../util";
import { Output } from "../helpers/output";

export class Spring {
  private _output: Output;
  private _duration!: number;
  private _precision: number = 0.001;

  private _m: number = 1;   // mass
  private _k: number = 170; // spring constant

  private _v_0: number = 0; // initial velocity

  private _c: number = 26;  // damping
  private _c_c!: number;    // critical damping
  private _z!: number;      // damping ratio

  private _w!: number;      // frequency
  private _w_0!: number;    // natural frequency

  constructor(config?: Configuration){
    this._output = new Output(config?.from, config?.to);

    if(config?.mass) this._m = math.limitMin(config.mass, 0.1);
    if(config?.damping) this._c = math.limitMin(config.damping, 1);
    if(config?.velocity) this._v_0 = config.velocity;
    if(config?.stiffness) this._k = math.limitMin(config.stiffness, 1);
    if(config?.precision) this._precision = config.precision;
    this.update();
  }

  get output(){
    return this._output;
  }

  get duration(){
    return this._duration;
  }

  get behavior(): Behavior {
    if(this._z < 1) return Behavior.Underdamped;
    if(this._z > 1) return Behavior.Overdamped;
    return Behavior.CriticallyDamped;
  }

  at(t: number){
    if(t >= this._duration) return this._output.to;
    return this._output.toAbsolute(1-this.calculate(t/1000));
  }

  clone(){
    return new Spring({
      from: this._output.from,
      to: this._output.to,
      mass: this._m,
      damping: this._c,
      velocity: this._v_0,
      stiffness: this._k,
      precision: this._precision
    });
  }

  private update(){
    this._c_c = 2*Math.sqrt(this._k*this._m);
    this._z = this._c/this._c_c;
    this._w_0 = Math.sqrt(this._k/this._m);

    if(this._z < 1) this._w = this._w_0*Math.sqrt(1-this._z**2);
    else if(this._z > 1) this._w = this._w_0*Math.sqrt(this._z**2-1);
    else this._w = 0;

    this._duration = this.equilibrium();
  }

  private calculate(x: number){
    // Underdamped
    if(this._z < 1){
      let decay = Math.E**(-this._z*this._w_0*x),
      sin = (this._v_0+this._z*this._w_0)/this._w*Math.sin(this._w*x),
      cos = Math.cos(this._w*x);
      return decay*(sin+cos);
    }

    // Overdamped
    else if(this._z > 1){
      let decay = Math.E**((this._w+this._z*this._w_0)*x),
      amp1 = (this._w+this._z*this._w_0+this._v_0)/(2*this._w),
      amp2 = (this._w-this._z*this._w_0-this._v_0)/(2*this._w);
      return amp1*decay+amp2/decay;
    }

    // Critically damped
    else {
      let decay = Math.E**(-this._w_0*x);
      return decay+(this._v_0+this._w)*x*decay;
    }
  }

  private equilibrium(){
    let t = 0, v = this._v_0, y = 1;
    while(Math.abs(v) > this._precision/10 || Math.abs(y) > this._precision){
      t++;
      v += (-this._k*0.000001*y - this._c*0.001*v)/this._m;
      y += v;
    }
    return t;
  }
}

export type {
  Behavior,
  Configuration as SpringConfiguration
}