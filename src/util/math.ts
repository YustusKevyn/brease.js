export function limit(value: number, min: number, max: number){
  return value < min ? min : value > max ? max : value;
}

export function lowerLimit(value: number, min: number){
  return Math.max(value, min);
}

export function upperLimit(value: number, max: number){
  return Math.min(value, max);
}