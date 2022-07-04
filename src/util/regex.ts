type Match = {
  end: number;
  start: number;
  value: string;
  length: number;
  groups: string[];
};

export function exec(str: string, regex: RegExp): Match | null {
  let match = regex.exec(str);
  if(!match) return null;

  let length = match[0].length;
  return {
    value: match[0],
    end: match.index+length,
    start: match.index,
    groups: match,
    length
  };
}

export function match(str: string, regex: RegExp){
  let match, offset = 0, final: Match[] = [];
  while((match = exec(str, regex))){
    let index = match.start;
    match.end += offset;
    match.start += offset;
    
    final.push(match);
    offset += index+match.length;
    str = str.slice(index+match.length);
  }
  return final;
}