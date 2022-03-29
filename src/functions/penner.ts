import type { Args, Function } from "../types";

import Easing from "../easing";
import { elastic } from "./elastic";
import { toInOut, toOut, toOutIn } from "../util";

export default class Penner extends Easing{
  constructor(name: keyof typeof library, ...args: Args){
    if(!(name in library)) throw new Error("unknown penner function");
    super(library[name], ...args);
  };
};

/**
 * Library 
 */
let quad: Function = t => t**2;
let cubic: Function = t => t**3;
let quart: Function = t => t**4;
let quint: Function = t => t**5;
let expo: Function = t => t === 0 ? 0 : 2**(10*t-10);
let sine: Function = t => 1-Math.cos(t*Math.PI/2);
let circ: Function = t => 1-Math.sqrt(1-t**2);
let back: Function = t => t**2*(2.70158*t-1.70158);

let Elastic1 = elastic(1, 0.3);
let Elastic2 = elastic(1, 0.45);

export let library = {
  // Quad 
  inQuad: quad,
  outQuad: toOut(quad),
  inOutQuad: toInOut(quad),
  outInQuad: toOutIn(quad),
  
  // Cubic 
  inCubic: cubic,
  outCubic: toOut(cubic),
  inOutCubic: toInOut(cubic),
  outInCubic: toOutIn(cubic),
  
  // Quart 
  inQuart: quart,
  outQuart: toOut(quart),
  inOutQuart: toInOut(quart),
  outInQuart: toOutIn(quart),
  
  // Quint 
  inQuint: quint,
  outQuint: toOut(quint),
  inOutQuint: toInOut(quint),
  outInQuint: toOutIn(quint),
  
  // Expo 
  inExpo: expo,
  outExpo: toOut(expo),
  inOutExpo: toInOut(expo),
  outInExpo: toOutIn(expo),
  
  // Sine 
  inSine: sine,
  outSine: toOut(sine),
  inOutSine: toInOut(sine),
  outInSine: toOutIn(sine),
  
  // Circ 
  inCirc: circ,
  outCirc: toOut(circ),
  inOutCirc: toInOut(circ),
  outInCirc: toOutIn(circ),
  
  // Back 
  inBack: back,
  outBack: toOut(back),
  inOutBack: toInOut(back),
  outInBack: toOutIn(back),

  // Elastic 
  inElastic: Elastic1,
  outElastic: toOut(Elastic1),
  inOutElastic: toInOut(Elastic2),
  outInElastic: toOutIn(Elastic2)
} as const;