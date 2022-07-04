type Pattern = string | RegExp;
type Patterns = Pattern | Pattern[];

export const numberPattern = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/;

export function delimit(pattern: Pattern){
  if(typeof pattern !== "string") pattern = pattern.source;
  return new RegExp(`^(?:${pattern})$`);
}

export function notation(name: Patterns, args?: Patterns | false, opt?: Patterns | false){
  if(!Array.isArray(name)) name = [name];
  if(!Array.isArray(args)) args = args ? [args] : [];
  if(!Array.isArray(opt)) opt = opt ? [opt] : [];

  let final = `(?:${name.join("|")})\\(`, i = 0;
  args = args.map(p => typeof p === "string" ? p : p.source);
  opt = opt.map(p => typeof p === "string" ? p : p.source);
  
  // Required
  for(let j = 0; j < args.length; j++){
    if(i > 0) final += ",";
    final += `\\s*(${args[i]})\\s*`;
    i++;
  }

  // Optional
  let checkOpt = (j: number = 0): string => {
    if(j >= (opt as string[]).length) return "";
    return `(?:${i++ > 1 ? "," : ""}\\s*(${(opt as string[])[i]})\\s*${checkOpt(i+1)})?`;
  }
  final += checkOpt();

  // Finalise
  return final+"\\)";
}