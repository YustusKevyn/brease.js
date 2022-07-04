import type { MotionConfiguration } from "../../motion";
import type { Configuration, Precision } from "./types";

import { math } from "../../util";
import { Timing } from "../timing";
import { Motion } from "../../motion";
import { Behavior } from "./constants";

export class Spring extends Timing {
  private _m: number = 1;           // mass
  private _k: number = 100;         // spring constant

  private _v_0: number = 0;         // initial velocity
  private _v_r: number = 0;         // rest velocity

  private _c: number = 0;           // damping
  private _c_c: number;             // circital damping
  private _z: number;               // damping ratio

  private _w_0: number;             // natural frequency
  private _w_d: number;             // damped natural frequency

  private _y_r: number = 1e-3;      // rest distance

  private _clamp: boolean = false;
  private _bounce: boolean = false;
  private _duration: number;

  constructor(config?: Configuration){
    super();
    
    // Config
    if(config?.mass !== undefined) this._m = math.limitMin(config.mass, 0.1);
    if(config?.damping !== undefined) this._c = math.limitMin(config.damping, 1);
    if(config?.velocity !== undefined) this._v_0 = config.velocity;
    if(config?.stiffness !== undefined) this._k = math.limitMin(config.stiffness, 1);
    if(config?.clamp !== undefined) this._clamp = config.clamp;
    if(config?.bounce !== undefined) this._bounce = config.bounce;

    // Precision
    if(config?.precision !== undefined){
      let precision: Precision = typeof config?.precision === "number" ? {distance: config.precision} : config?.precision;
      if(precision.distance) this._y_r = math.limitMin(precision.distance, 1e-10);
      if(precision.velocity) this._v_r = math.limitMin(precision.velocity, 1e-10);
    }
    if(!this._v_r) this._v_r = this._y_r/10;

    // Damping
    this._c_c = 2*Math.sqrt(this._k*this._m);
    this._z = this._c/this._c_c;
    
    // Frequency
    this._w_0 = Math.sqrt(this._k/this._m);
    if(this._z < 1) this._w_d = this._w_0*Math.sqrt(1-this._z**2);
    else if(this._z > 1) this._w_d = this._w_0*Math.sqrt(this._z**2-1);
    else this._w_d = 0;

    // Duration
    let t = 0, v = this._v_0/1000, y = 1;
    while(t++ < 1e5 && !this._clamp ? Math.abs(v) > this._v_r || Math.abs(y) > this._y_r : y > 0){
      y += v += (-this._k*1e-6*y - this._c*1e-3*v)/this._m;
    }
    this._duration = t;
  }

  get mass(){ return this._m; }
  get damping(){ return this._c; }
  get velocity(){ return this._v_0; }
  get stiffness(){ return this._k; }

  get clamp(){ return this._clamp; }
  get bounce(){ return this._bounce; }
  get duration(){ return this._duration; }

  get dampingRatio(){ return this._z; }
  get naturalFrequency(){ return this._w_0; }
  get dampedNaturalFrequency(){ return this._w_d; }

  get behavior(): Behavior {
    if(this._z < 1) return Behavior.Underdamped;
    if(this._z > 1) return Behavior.Overdamped;
    return Behavior.CriticallyDamped;
  }

  clone(config?: Configuration){
    return new Spring({
      mass: this._m,
      damping: this._c,
      velocity: this._v_0,
      stiffness: this._k,
      clamp: this._clamp,
      bounce: this._bounce,
      precision: {
        distance: this._y_r,
        velocity: this._v_r
      },
      ...config
    });
  }
  
  override toMotion(config: MotionConfiguration){
    let start, end;
    if(config?.start !== undefined) [start, end] = [config.start, config.start+this._duration];
    else if(config?.end !== undefined) [start, end] = [config.end-this._duration, config.end];
    else [start, end] = [0, this._duration];
    return new Motion(this, {...config, start, end});
  }

  protected calculate(x: number){
    x *= this._duration/1000;

    // Underdamped
    if(this._z < 1){
      let decay = Math.E**(-this._z*this._w_0*x),
      sin = (this._v_0+this._z*this._w_0)/this._w_d*Math.sin(this._w_d*x),
      cos = Math.cos(this._w_d*x);
      return 1-decay*(sin+cos);
    }

    // Overdamped
    else if(this._z > 1){
      let decay1 = Math.E**((this._w_d-this._z*this._w_0)*x),
      decay2 = Math.E**((-this._w_d-this._z*this._w_0)*x),
      amp1 = (this._w_d+this._z*this._w_0+this._v_0)/(2*this._w_d),
      amp2 = (this._w_d-this._z*this._w_0-this._v_0)/(2*this._w_d);
      return 1-amp1*decay1+amp2*decay2;
    }

    // Critically damped
    else {
      let decay = Math.E**(-this._w_0*x);
      return 1-decay+(this._v_0+this._w_d)*x*decay;
    }
  }
}