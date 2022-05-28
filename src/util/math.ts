export function limit(value: number, min: number, max: number){
  return value < min ? min : value > max ? max : value;
}

export function limitMin(value: number, min: number){
  return Math.max(value, min);
}

export function limitMax(value: number, max: number){
  return Math.min(value, max);
}

export function between(value: number, start: number, end: number){
  return value >= start && value <= end;
}

export function remap(value: number, inStart: number, inEnd: number, outStart: number, outEnd: number){
  return (value-inStart)*(outEnd-outStart)/(inEnd-inStart)+outStart;
}