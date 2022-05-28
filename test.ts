import Brease from "./src";

console.clear();
console.log(new Date().toTimeString());

graph(new Brease.BezierEasing({x1: 0.3, y1: 1.2, x2: 0.4, y2: -0.6}));

function graph(easing: Brease.Easing){
  easing.output.range = [0, 80];
  for(let v of easing.keyframes(50)) console.log(" ".repeat(20+v)+"*");
}