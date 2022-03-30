export const directions = ["start", "end", "none", "both"] as const;
export type Direction = (typeof directions)[number];