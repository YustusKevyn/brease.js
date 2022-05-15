import type { BackEasing, BackEasingConfiguration } from "../classes/back";
import type { BasicEasing, BasicEasingConfiguration } from "../classes/basic";
import type { BezierEasing, BezierEasingConfiguration } from "../classes/bezier";
import type { CircularEasing, CircularEasingConfiguration } from "../classes/circular";
import type { ElasticEasing, ElasticEasingConfiguration } from "../classes/elastic";
import type { PolynomialEasing, PolynomialEasingConfiguration } from "../classes/polynomial";
import type { SinusodialEasing, SinusodialEasingConfiguration } from "../classes/sinusodial";
import type { StepsEasing, StepsEasingConfiguration } from "../classes/steps";

export interface Easings {
  back: {
    class: BackEasing,
    config: BackEasingConfiguration
  },
  basic: {
    class: BasicEasing,
    config: BasicEasingConfiguration
  },
  bezier: {
    class: BezierEasing,
    config: BezierEasingConfiguration
  },
  circular: {
    class: CircularEasing,
    config: CircularEasingConfiguration
  },
  elastic: {
    class: ElasticEasing,
    config: ElasticEasingConfiguration
  },
  polynomial: {
    class: PolynomialEasing,
    config: PolynomialEasingConfiguration
  },
  sinusodial: {
    class: SinusodialEasing,
    config: SinusodialEasingConfiguration
  },
  steps: {
    class: StepsEasing,
    config: StepsEasingConfiguration
  }
}