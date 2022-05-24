/**
 * Based on:
 * https://github.com/gre/bezier-easing/blob/master/src/index.js
 * by Gaëtan Renaudeau
 */

import type { BaseConfiguration } from "../types";

import { Easing } from "./easing";
import { limit } from "../../util/math";

const a = (a1: number, a2: number) => 1 - 3*a2 + 3*a1;
const b = (a1: number, a2: number) => 3*a2 - 6*a1;
const c = (a1: number) => 3*a1;

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

  private _newtonSlope = 0.001;
  private _newtonIterations = 4;

  private _sample!: Float32Array;
  private _sampleSize = 11;
  private _sampleCoords!: [x1: number, x2: number];

  private _subdivisionStep = 1/(this._sampleSize-1);
  private _subdivisionPrecision = 0.0000001;
  private _subdivisionIterations = 10;

  constructor(config?: BezierEasingConfiguration){
    super(config?.from, config?.to, config?.start, config?.end);
    if(config?.x1) this.x1 = config.x1;
    if(config?.y1) this.y1 = config.y1;
    if(config?.x2) this.x2 = config.x2;
    if(config?.y2) this.y2 = config.y2;
    this.sample();
  }

  get x1(){
    return this._x1;
  }
  set x1(value: number){
    this._x1 = limit(value, 0, 1);
  }

  get y1(){
    return this._y1;
  }
  set y1(value: number){
    this._y1 = value;
  }

  get x2(){
    return this._x2;
  }
  set x2(value: number){
    this._x2 = limit(value, 0, 1);
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

  private bezier(u: number, a1: number, a2: number){
    return ((a(a1, a2)*u + b(a1, a2))*u + c(a1))*u;
  }

  private tangent(u: number, a1: number, a2: number){
    return 3*a(a1, a2)*u**2 + 2*b(a1, a2)*u + c(a1);
  }

  private sample(){
    this._sample = new Float32Array(this._sampleSize);
    this._sampleCoords = [this._x1, this._x2];
    for(let i = 0; i < this._sampleSize; i++){
      this._sample[i] = this.bezier(i*this._subdivisionStep, this._x1, this._x2);
    }
  }

  private subdivide(x: number, start: number, end: number, a1: number, a2: number){
    let u, m, i = 0;
    do {
      console.log(start, end);
      i++
      m = start+(end-start)/2;
      u = this.bezier(m, a1, a2)-x;
      if(u > 0) end = m;
      else start = m;
    }
    while (Math.abs(u) > this._subdivisionPrecision && i < this._subdivisionIterations);
    return m;
  }

  private iterate(x: number, u: number, a1: number, a2: number){
    for(let i = 0; i < this._newtonIterations; i++){
      let t = this.tangent(u, a1, a2);
      if(t === 0) return u;
      let y = this.bezier(u, a1, a2)-x;
      u -= y/t;
    }
    return u;
  }

  protected calculate(x: number){
    if(x === 0 || x === 1) return x;
    if(this._x1 === this._y1 && this._x2 === this._y2) return x;
    if(this._x1 !== this._sampleCoords[0] || this._x2 !== this._sampleCoords[1]) this.sample();

    let i = 0, start = 0;
    while(i++ < this._sampleSize-1 && this._sample[i] <= x) start += this._subdivisionStep;

    let dist = (x-this._sample[i-1])/(this._sample[i]-this._sample[i-1]),
    u = start+dist*this._subdivisionStep,
    t = this.tangent(u, this._x1, this._x2);

    if(t >= this._newtonSlope) u = this.iterate(x, u, this._x1, this._x2);
    else if(t !== 0) u = this.subdivide(x, start, start+this._subdivisionStep, this._x1, this._x2);
    return this.bezier(u, this._y1, this._y2);
  }
}