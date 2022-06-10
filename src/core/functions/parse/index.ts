import type { Preset } from "../../types";
import type { SpringConfiguration } from "../../../spring";
import type { BackEasingConfiguration, CircularEasingConfiguration, EasingDirection, ElasticEasingConfiguration, PolynomialEasingConfiguration, SinusodialEasingConfiguration, StepsEasingConfiguration, StepsEasingContinuity } from "../../../easing";

import { presets } from "../../presets";
import { Spring } from "../../../spring";
import { BackEasing, BezierEasing, CircularEasing, ElasticEasing, PolynomialEasing, SinusodialEasing, StepsEasing } from "../../../easing";
import { backFunctionPattern, bezierFunctionPattern, circularFunctionPattern, elasticFunctionPattern, polynomialFunctionPattern, sinusodialFunctionPattern, springFunctionPattern, stepsFunctionPattern } from "./constants";

interface State {
  input: string;
}

export function parse(input: Preset | (string & {})){
  input = input.trim();
  if(input in presets) return presets[input as Preset].clone();

  let state = {input};
  return (
    parseBack(state) ||
    parseBezier(state) ||
    parseCircular(state) ||
    parseElastic(state) ||
    parsePolynomial(state) ||
    parseSinusodial(state) ||
    parseSpring(state) ||
    parseSteps(state) ||
    null
  );
}

function praseArguments(state: State, pattern: string){
  return state.input.match(pattern)?.slice(1) ?? null;
}

function parseBack(state: State){
  let args = praseArguments(state, backFunctionPattern);
  if(!args) return null;

  let config: BackEasingConfiguration = {};
  if(args[0]) config.overshoot = parseFloat(args[0]);
  if(args[1]) config.direction = args[1] as EasingDirection;
  return new BackEasing(config);
}

function parseBezier(state: State){
  let args = praseArguments(state, bezierFunctionPattern);
  if(!args) return null;

  return new BezierEasing({
    x1: parseFloat(args[0]),
    y1: parseFloat(args[1]),
    x2: parseFloat(args[2]),
    y2: parseFloat(args[3])
  });
}

function parseCircular(state: State){
  let args = praseArguments(state, circularFunctionPattern);
  if(!args) return null;

  let config: CircularEasingConfiguration = {};
  if(args[0]) config.degree = parseFloat(args[0]);
  if(args[1]) config.direction = args[1] as EasingDirection;
  return new CircularEasing(config);
}

function parseElastic(state: State){
  let args = praseArguments(state, elasticFunctionPattern);
  if(!args) return null;

  let config: ElasticEasingConfiguration = {};
  if(args[0]) config.amplitude = parseFloat(args[0]);
  if(args[1]) config.period = parseFloat(args[1]);
  if(args[2]) config.direction = args[2] as EasingDirection;
  return new ElasticEasing(config);
}

function parsePolynomial(state: State){
  let args = praseArguments(state, polynomialFunctionPattern);
  if(!args) return null;

  let config: PolynomialEasingConfiguration = {};
  if(args[0]) config.degree = parseFloat(args[0]);
  if(args[1]) config.direction = args[1] as EasingDirection;
  return new PolynomialEasing(config);
}

function parseSinusodial(state: State){
  let args = praseArguments(state, sinusodialFunctionPattern);
  if(!args) return null;

  let config: SinusodialEasingConfiguration = {};
  if(args[0]) config.degree = parseFloat(args[0]);
  if(args[1]) config.direction = args[1] as EasingDirection;
  return new SinusodialEasing(config);
}

function parseSpring(state: State){
  let args = praseArguments(state, springFunctionPattern);
  if(!args) return null;

  let config: SpringConfiguration = {};
  if(args[0]) config.mass = parseFloat(args[0]);
  if(args[1]) config.tension = parseFloat(args[1]);
  if(args[2]) config.friction = parseFloat(args[2]);
  if(args[3]) config.velocity = parseFloat(args[3]);
  return new Spring(config);
}

function parseSteps(state: State){
  let args = praseArguments(state, stepsFunctionPattern);
  if(!args) return null;

  let config: StepsEasingConfiguration = {steps: parseFloat(args[0])}, continuity = args[1];
  if(continuity){
    if(continuity === "jump-start") config.continuity = "start";
    else if(continuity === "jump-end") config.continuity = "end";
    else config.continuity = continuity as StepsEasingContinuity;
  }
  return new StepsEasing(config);
}