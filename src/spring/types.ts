export enum Behavior {
  Underdamped,
  CriticallyDamped,
  Overdamped
};

export interface Configuration {
  from?: number | undefined;
  to?: number | undefined;
  mass?: number | undefined;
  damping?: number | undefined;
  velocity?: number | undefined;
  stiffness?: number | undefined;
  precision?: number | undefined;
}