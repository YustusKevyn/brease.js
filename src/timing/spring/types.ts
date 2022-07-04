export interface Configuration {
  mass?: number | undefined;
  damping?: number | undefined;
  velocity?: number | undefined;
  stiffness?: number | undefined;
  clamp?: boolean | undefined;
  bounce?: boolean | undefined;
  precision?: Precision | number | undefined;
}

export interface Precision {
  velocity?: number | undefined;
  distance?: number | undefined;
}