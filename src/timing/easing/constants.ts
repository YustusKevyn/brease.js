import { pattern } from "../../util";

export const directionPattern = "in|out|in-out|out-in";
export const continuityPattern = "start|jump-start|end|jump-end|none|both";

export const backNotation = pattern.notation("back", false, [pattern.numberPattern, directionPattern]);
export const bezierNotation = pattern.notation(["bezier", "cubic-bezier"], [pattern.numberPattern, pattern.numberPattern, pattern.numberPattern, pattern.numberPattern]);
export const circularNotation = pattern.notation("circular", false, [pattern.numberPattern, directionPattern]);
export const polynomialNotation = pattern.notation("polynomial", false, [pattern.numberPattern, directionPattern]);
export const sinusodialNotation = pattern.notation("sinusodial", false, [pattern.numberPattern, directionPattern]);
export const stepsNotation = pattern.notation("steps", pattern.numberPattern, continuityPattern);