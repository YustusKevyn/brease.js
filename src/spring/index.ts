import type { Configuration } from "./types"

import { math } from "../util";
import { Output } from "../helpers/output";

export class Spring {
  private _output: Output;

  private _m: number = 1;   // mass
  private _k: number = 170; // spring constant
  private _v: number = 0;   // inital velocity
  
  private _c: number = 26;  // damping
  private _c_c!: number;    // critical damping
  private _z!: number;      // damping ratio

  private _f!: number;      // frequency
  private _f_n!: number;    // natural frequency

  constructor(config?: Configuration){
    this._output = new Output(config?.from, config?.to);

    if(config?.mass) this._m = math.limitMin(config.mass, 0.1);
    if(config?.tension) this._m = math.limitMin(config.tension, 1);
    if(config?.friction) this._m = math.limitMin(config.friction, 1);
    if(config?.velocity) this._v = config.velocity;
    this.update();
  }

  get mass(){
    return this._m;
  }
  set mass(value: number){
    value = math.limitMin(value, 0.1);
    if(value !== this._m){
      this._m = value;
      this.update();
    }
  }

  get tension(){
    return this._k;
  }
  set tension(value: number){
    value = math.limitMin(value, 1);
    if(value !== this._k){
      this._k = value;
      this.update();
    }
  }

  get friction(){
    return this._c;
  }
  set friction(value: number){
    value = math.limitMin(value, 1);
    if(value !== this._c){
      this._c = value;
      this.update();
    }
  }

  get velocity(){
    return this._v;
  }
  set velocity(value: number){
    if(value !== this._v){
      this._v = value;
      this.update();
    }
  }

  clone(){
    return new Spring({
      from: this._output.from,
      to: this._output.to,
      mass: this._m,
      tension: this._k,
      friction: this._c,
      velocity: this._v
    });
  }

  private update(){
    this._c_c = 2*Math.sqrt(this._k*this._m);
    this._z = this._c/this._c_c;
    this._f_n = Math.sqrt(this._k/this._m);

    if(this._z < 1) this._f = this._f_n*Math.sqrt(1-this._z**2);
    else if(this._z < 1) this._f = this._f_n*Math.sqrt(this._z**2-1);
    else this._f = 0;
  }

  private calculate(x: number){
    // Underdamped 
    if(this._z < 1){
      let decay = Math.E**(-this._z*this._f_n*x),
      sin = (this._v+this._z*this._f_n)/this._f*Math.sin(this._f*x),
      cos = Math.cos(this._f*x);
      return decay*(sin+cos);
    }

    // Overdamped
    else if(this._z > 1){
      let decay = Math.E**((this._f+this._z*this._f_n)*x),
      amp1 = (this._f+this._z*this._f_n+this._v)/(2*this._f),
      amp2 = (this._f-this._z*this._f_n-this._v)/(2*this._f);
      return amp1*decay+amp2/decay;
    }

    // Critically damped
    else {
      let decay = Math.E**(-this._f_n*x);
      return decay+(this._v+this._f)*x*decay;
    }
  }
}

export type {
  Configuration as SpringConfiguration
}