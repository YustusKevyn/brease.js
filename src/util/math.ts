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

export function remap(x: number, x1: number, y1: number, x2: number, y2: number){
  return (x-x1)*(y2-y1)/(x2-x1)+y1;
}