import { BackEasing, BackEasingConfiguration } from "../classes/back";
import { BasicEasing, BasicEasingConfiguration } from "../classes/basic";
import { BezierEasing, BezierEasingConfiguration } from "../classes/bezier";
import { CircularEasing, CircularEasingConfiguration } from "../classes/circular";
import { ElasticEasing, ElasticEasingConfiguration } from "../classes/elastic";
import { PolynomialEasing, PolynomialEasingConfiguration } from "../classes/polynomial";
import { SinusodialEasing, SinusodialEasingConfiguration } from "../classes/sinusodial";
import { StepsEasing, StepsEasingConfiguration } from "../classes/steps";

export interface Classes {
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