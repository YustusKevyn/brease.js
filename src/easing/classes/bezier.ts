import type { BaseConfiguration } from "../types";

import { Easing } from "./easing";
import { math } from "../../util";

export interface BezierEasingConfiguration extends BaseConfiguration {
  x1?: number | undefined;
  y1?: number | undefined;
  x2?: number | undefined;
  y2?: number | undefined;
}

export class BezierEasing extends Easing {
  private _x1: number = 0;
  private _y1: number = 0;
  private _x2: number = 1;
  private _y2: number = 1;

  private _lut!: Float32Array;
  private _lutSize = 11;
  private _lutGap = 1/(this._lutSize-1);

  private _newtonEpsilon = 1e-14;
  private _newtonTolerance = 1e-7;
  private _newtonIterations = 10;

  constructor(config?: BezierEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.x1) this._x1 = math.limit(config.x1, 0, 1);
    if(config?.x2) this._x2 = math.limit(config.x2, 0, 1);
    if(config?.y1) this._y1 = config.y1;
    if(config?.y2) this._y2 = config.y2;
    this.sample();
  }

  get x1(){
    return this._x1;
  }
  set x1(value: number){
    value = math.limit(value, 0, 1);
    if(value !== this._x1){
      this._x1 = value;
      this.sample();
    }
  }

  get y1(){
    return this._y1;
  }
  set y1(value: number){
    this._y1 = value;
  }

  get x2(){
    return this._x1;
  }
  set x2(value: number){
    value = math.limit(value, 0, 1);
    if(value !== this._x2){
      this._x2 = value;
      this.sample();
    }
  }

  get y2(){
    return this._y2;
  }
  set y2(value: number){
    this._y2 = value;
  }

  clone(){
    return new BezierEasing({
      x1: this._x1,
      y1: this._y1,
      x2: this._x2,
      y2: this._y2,
      from: this.output.from,
      to: this.output.to,
      start: this.time.start,
      end: this.time.end
    });
  }

  /**
   * Calculates the value of the bézier curve at t
   * @param t 
   * @param p1 control point 1
   * @param p2 control point 2
   * @returns bézier value
   */
  private bezier(t: number, p1: number, p2: number){
    return 3*(1-t)**2*t*p1 + 3*(1-t)*t**2*p2 + t**3;
  }

  /**
   * Calculates the derivative of the bézier curve at t
   * @param t 
   * @param p1 control point 1
   * @param p2 control point 2
   * @returns bézier value
   */
  private derivative(t: number, p1: number, p2: number){
    return 3*(1-t)**2*p1 + 6*(1-t)*t*(p2-p1) + 3*t**2*(1-p2);
  }

  /**
   * Generates the lookup table
   */
  private sample(){
    this._lut = new Float32Array(this._lutSize);
    for(let i = 0; i < this._lutSize; i++){
      this._lut[i] = this.bezier(i*this._lutGap, this._x1, this._x2);
    }
  }

  /**
   * Approximates t for the specified distance using the lookup table
   * @param d distance
   * @returns t
   */
  private lookup(d: number){
    for(let i = 0; i < this._lutSize-1; i++){
      let s = this._lut[i], e = this._lut[i+1];
      if(math.between(d, s, e)){
        return math.remap(d, s, e, i*this._lutGap, (i+1)*this._lutGap);
      }
    }
    return d/this._lut[this._lutSize-1];
  }

  /**
   * Approximates t for the specified distance using newton's method
   * @param d distance
   * @param t guess for t
   * @param p1 control point 1
   * @param p2 control point 2
   * @returns `false` if newton's method did not converge
   */
  private iterate(d: number, t: number, p1: number, p2: number){
    for(let i = 0; i < this._newtonIterations; i++){
      let y = this.bezier(t, p1, p2), dy = this.derivative(t, p1, p2);
      if(Math.abs(dy) <= this._newtonEpsilon) return false;

      let dt = (y-d)/dy; t -= dt;
      if(Math.abs(dt) <= this._newtonTolerance) return t;
    }
    return false;
  }

  /**
   * Calculates the bezier value for the specified distance
   * @param dist
   * @returns bézier value
   */
  protected calculate(dist: number){
    if(dist === 0 || dist === 1) return dist;
    if(this._x1 === this._y1 && this._x2 === this._y2) return dist;

    let t = this.lookup(dist), nt = this.iterate(dist, t, this._x1, this._x2);
    return this.bezier(nt === false ? t : nt, this._y1, this._y2);
  }
}