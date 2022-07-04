import { BackEasing } from "./classes/back";
import { BasicEasing } from "./classes/basic";
import { BezierEasing } from "./classes/bezier";
import { CircularEasing } from "./classes/circular";
import { ElasticEasing } from "./classes/elastic";
import { PolynomialEasing } from "./classes/polynomial";
import { SinusodialEasing } from "./classes/sinusodial";

export const presets = {
  ease: new BezierEasing({x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0}),
  linear: new BasicEasing({fn: x => x}),

  // in
  easeIn: new BezierEasing({x1: 0.42, y1: 0.0, x2: 1.0, y2: 1.0}),
  easeInQuad: new PolynomialEasing({degree: 2, direction: "in"}),
  easeInCubic: new PolynomialEasing({degree: 3, direction: "in"}),
  easeInQuart: new PolynomialEasing({degree: 4, direction: "in"}),
  easeInQuint: new PolynomialEasing({degree: 5, direction: "in"}),
  easeInExpo: new BasicEasing({fn: x => 2**(10*x-10), direction: "in"}),
  easeInSine: new SinusodialEasing({degree: 1, direction: "in"}),
  easeInCirc: new CircularEasing({degree: 2, direction: "in"}),
  easeInBack: new BackEasing({overshoot: 1.70158, direction: "in"}),
  easeInElastic: new ElasticEasing({amplitude: 1, period: 0.3, direction: "in"}),

  // out
  easeOut: new BezierEasing({x1: 0.0, y1: 0.0, x2: 0.58, y2: 1.0}),
  easeOutQuad: new PolynomialEasing({degree: 2, direction: "out"}),
  easeOutCubic: new PolynomialEasing({degree: 3, direction: "out"}),
  easeOutQuart: new PolynomialEasing({degree: 4, direction: "out"}),
  easeOutQuint: new PolynomialEasing({degree: 5, direction: "out"}),
  easeOutExpo: new BasicEasing({fn: x => 2**(10*x-10), direction: "out"}),
  easeOutSine: new SinusodialEasing({degree: 1, direction: "out"}),
  easeOutCirc: new CircularEasing({degree: 2, direction: "out"}),
  easeOutBack: new BackEasing({overshoot: 1.70158, direction: "out"}),
  easeOutElastic: new ElasticEasing({amplitude: 1, period: 0.3, direction: "out"}),

  // in-out
  easeInOut: new BezierEasing({x1: 0.42, y1: 0.0, x2: 0.58, y2: 1.0}),
  easeInOutQuad: new PolynomialEasing({degree: 2, direction: "inOut"}),
  easeInOutCubic: new PolynomialEasing({degree: 3, direction: "inOut"}),
  easeInOutQuart: new PolynomialEasing({degree: 4, direction: "inOut"}),
  easeInOutQuint: new PolynomialEasing({degree: 5, direction: "inOut"}),
  easeInOutExpo: new BasicEasing({fn: x => 2**(10*x-10), direction: "inOut"}),
  easeInOutSine: new SinusodialEasing({degree: 1, direction: "inOut"}),
  easeInOutCirc: new CircularEasing({degree: 2, direction: "inOut"}),
  easeInOutBack: new BackEasing({overshoot: 2.5949095, direction: "inOut"}),
  easeInOutElastic: new ElasticEasing({amplitude: 1, period: 0.45, direction: "inOut"}),

  // out-in
  easeOutInQuad: new PolynomialEasing({degree: 2, direction: "outIn"}),
  easeOutInCubic: new PolynomialEasing({degree: 3, direction: "outIn"}),
  easeOutInQuart: new PolynomialEasing({degree: 4, direction: "outIn"}),
  easeOutInQuint: new PolynomialEasing({degree: 5, direction: "outIn"}),
  easeOutInExpo: new BasicEasing({fn: x => 2**(10*x-10), direction: "outIn"}),
  easeOutInSine: new SinusodialEasing({degree: 1, direction: "outIn"}),
  easeOutInCirc: new CircularEasing({degree: 2, direction: "outIn"}),
  easeOutInBack: new BackEasing({overshoot: 2.5949095, direction: "outIn"}),
  easeOutInElastic: new ElasticEasing({amplitude: 1, period: 0.45, direction: "outIn"})
} as const;