const numberPattern = "[+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?";
const directionPattern = "in|out|in-out|out-in";

export const backFunctionPattern = createFunctionPattern(["back"], [], [numberPattern, directionPattern]);
export const bezierFunctionPattern = createFunctionPattern(["bezier", "cubic-bezier"], [numberPattern, numberPattern, numberPattern, numberPattern]);
export const circularFunctionPattern = createFunctionPattern(["circular"], [], [numberPattern, directionPattern]);
export const elasticFunctionPattern = createFunctionPattern(["elastic"], [], [numberPattern, numberPattern, directionPattern]);
export const polynomialFunctionPattern = createFunctionPattern(["polynomial"], [], [numberPattern, directionPattern]);
export const sinusodialFunctionPattern = createFunctionPattern(["sinusodial"], [], [numberPattern, directionPattern]);
export const stepsFunctionPattern = createFunctionPattern(["steps"], [numberPattern], ["start|jump-start|end|jump-end|none|both"]);

function createFunctionPattern(name: string[], required: string[] = [], optional: string[] = []){
  let total = 0;

  // Optional
  let optionalArg = (i: number = 0): string => {
    if(i >= optional.length) return "";
    return `(?:${total++ > 1 ? "," : ""}\\s*(${optional[i]})\\s*${optionalArg(i+1)})?`;
  }

  // Source
  let source = `^(?:${name.join("|")})\\(`;
  for(let i = 0; i < required.length; i++){
    if(total > 0) source += ",";
    source += `\\s*(${required[i]})\\s*`;
    total++;
  }
  return `${source}${optionalArg()}\\)$`;
}