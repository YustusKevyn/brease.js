import Easing from "./easing";

type Args = ConstructorParameters<typeof Easing> extends [f: any, ...args: infer A] ? A : never;

export default class Bezier extends Easing{
  constructor(x1: number, y1: number, x2: number, y2: number, ...agrs: Args){
    if(!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) throw new Error("invalid points");
    super(bezier(x1, x2, y1, y2), ...agrs);
  };
};

/**
 * Bezier easing function 
 * https://github.com/gre/bezier-easing/blob/master/src/index.js 
 */
const kSplineTableSize = 11;
const kSampleStepSize = 1/(kSplineTableSize-1);

let A = (a1: number, a2: number) => 1-3*a2+3*a1;
let B = (a1: number, a2: number) => 3*a2-6*a1;
let C = (a1: number) => 3*a1;

let calcBezier = (t: number, a1: number, a2: number) => ((A(a1, a2)*t + B(a1, a2))*t + C(a1))*t;
let getSlope = (t: number, a1: number, a2: number) => 3*A(a1, a2)*t*t + 2*B(a1, a2)*t + C(a1);

function binarySubdivide(x: number, a: number, b: number, x1: number, x2: number) {
  let currentX, currentT, i = 0;
  do{
    currentT = a+(b-a)/2;
    currentX = calcBezier(currentT, x1, x2)-x;
    if(currentX > 0) b = currentT
    else a = currentT;
  } while(Math.abs(currentX) > 0.0000001 && ++i < 10);
  return currentT;
};

function newtonRaphsonIterate(x: number, g: number, x1: number, x2: number){
  for(let i = 0; i < 4; ++i){
    let currentSlope = getSlope(g, x1, x2);
    if(currentSlope === 0) return g;
    let currentX = calcBezier(g, x1, x2)-x;
    g -= currentX/currentSlope;
  }
  return g;
};

function bezier(x1: number, y1: number, x2: number, y2: number){
  let s = new Float32Array(kSplineTableSize);

  if(x1 !== y1 || x2 !== y2){
    for(let i = 0; i < kSplineTableSize; ++i){
      s[i] = calcBezier(i * kSampleStepSize, x1, x2);
    }
  }

  let t = (x: number) => {
    let intervalStart = 0,
    si = 1,
    sl = kSplineTableSize-1;

    for(; si !== sl && s[si] <= x; ++si) intervalStart += kSampleStepSize;
    --si;

    let dist = (x-s[si])/(s[si+1]-s[si]),
    guessForT = intervalStart + dist * kSampleStepSize,
    initialSlope = getSlope(guessForT, x1, x2);

    if(initialSlope >= 0.001) return newtonRaphsonIterate(x, guessForT, x1, x2);
    if(initialSlope === 0.0) return guessForT;
    return binarySubdivide(x, intervalStart, intervalStart + kSampleStepSize, x1, x2);
  };

  return (x: number) => {
    if(x1 === y1 && x2 === y2) return x;
    if(x === 0 || x === 1) return x;
    return calcBezier(t(x), y1, y2);
  };
};