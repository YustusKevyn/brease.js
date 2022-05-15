import type { Input, Preset } from "../types";

import { presets } from "../presets";

import { Easing } from "../classes/easing";
import { BackEasing } from "../classes/back";
import { BasicEasing } from "../classes/basic";
import { BezierEasing } from "../classes/bezier";
import { CircularEasing } from "../classes/circular";
import { ElasticEasing } from "../classes/elastic";
import { PolynomialEasing } from "../classes/polynomial";
import { SinusodialEasing } from "../classes/sinusodial";
import { StepsEasing } from "../classes/steps";

export function create(input: Input){
  if(input instanceof Easing) return input.clone();
  if(typeof input === "function") return new Easing(input);
  if(typeof input === "string"){
    if(input in presets) return presets[input as Preset].clone();
  }
  if(typeof input === "object"){
    if(input.type === "back") return new BackEasing(input);
    if(input.type === "basic") return new BasicEasing(input);
    if(input.type === "bezier") return new BezierEasing(input);
    if(input.type === "circular") return new CircularEasing(input);
    if(input.type === "elastic") return new ElasticEasing(input);
    if(input.type === "polynomial") return new PolynomialEasing(input);
    if(input.type === "sinusodial") return new SinusodialEasing(input);
    if(input.type === "steps") return new StepsEasing(input);
  }
  return new Easing(t => t);
}