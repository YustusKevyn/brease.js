import type { Arguments, Function } from "../types";

import { limit } from "../../util/math";
import { BaseEasing } from "./base";

export class BezierEasing extends BaseEasing {
  constructor(x1: number, y1: number, x2: number, y2: number, ...args: Arguments){
    super(BezierEasing.fn(x1, y1, x2, y2), ...args);
  }

  static fn(x1: number, y1: number, x2: number, y2: number): Function {
    x1 = limit(x1, 0, 1);
    x2 = limit(x2, 0, 1);
    if(x1 === y1 && x2 === y2) return t => t;

    let s = table(x1, x2);
    return t => {
      if(t === 0 || t === 1) return t;
      return calculate(tangent(t, s, x1, x2), y1, y2);
    }
  }
}

/**
 * https://github.com/gre/bezier-easing/blob/master/src/index.js 
 */
const kSplineTableSize = 11;
const kSampleStepSize = 1/(kSplineTableSize-1);

let A = (aA1: number, aA2: number) => 1-3*aA2+3*aA1;
let B = (aA1: number, aA2: number) => 3*aA2-6*aA1;
let C = (aA1: number) => 3*aA1;

function slope(aT: number, aA1: number, aA2: number){
  return 3*A(aA1, aA2)*aT*aT + 2*B(aA1, aA2)*aT + C(aA1);
}

function calculate(aT: number, aA1: number, aA2: number){
  return((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
}

function subdivide(aX: number, aA: number, aB: number, mX1: number, mX2: number) {
  let currentX, currentT, i = 0;
  do{
    currentT = aA+(aB-aA)/2;
    currentX = calculate(currentT, mX1, mX2)-aX;
    if(currentX > 0) aB = currentT
    else aA = currentT;
  } while(Math.abs(currentX) > 0.0000001 && i++ < 10);
  return currentT;
}

function iterate(aX: number, aGuess: number, mX1: number, mX2: number){
  for(let i = 0; i < 4; i++){
    let currentSlope = slope(aGuess, mX1, mX2);
    if(currentSlope === 0) return aGuess;
    let currentX = calculate(aGuess, mX1, mX2)-aX;
    aGuess -= currentX/currentSlope;
  }
  return aGuess;
}

function table(mX1: number, mX2: number){
  let s = new Float32Array(kSplineTableSize);
  for(let i = 0; i < kSplineTableSize; i++){
    s[i] = calculate(i*kSampleStepSize, mX1, mX2);
  }
  return s;
}

function tangent(aX: number, s: Float32Array, mX1: number, mX2: number){
  let si = 1, sl = kSplineTableSize-1, intervalStart = 0;
  for(; si !== sl && s[si] <= aX; si++) intervalStart += kSampleStepSize;
  si--;

  let dist = (aX-s[si])/(s[si+1]-s[si]),
  guessForT = intervalStart + dist * kSampleStepSize,
  initialSlope = slope(guessForT, mX1, mX2);

  if(initialSlope >= 0.001) return iterate(aX, guessForT, mX1, mX2);
  if(initialSlope === 0.0) return guessForT;
  return subdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
}