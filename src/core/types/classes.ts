import type {
  BackEasing, BackEasingConfiguration,
  BasicEasing, BasicEasingConfiguration,
  BezierEasing, BezierEasingConfiguration,
  CircularEasing, CircularEasingConfiguration,
  ElasticEasing, ElasticEasingConfiguration,
  PolynomialEasing, PolynomialEasingConfiguration,
  SinusodialEasing, SinusodialEasingConfiguration,
  StepsEasing, StepsEasingConfiguration
} from "../../easing"

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