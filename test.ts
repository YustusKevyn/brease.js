import Brease from "./src";

console.clear();
console.log("======================================================");
console.log(new Date().getTime());

let a = new Brease.BezierEasing({x1: 0.25, x2: 0.25});
let b = new Brease.BezierEasing({x1: 0.9, y1: 1.54, x2: 0.1, y2: -0.5});

g(a);

a.x1 = 0.9;
a.y1 = 1.54;
a.x2 = 0.1;
a.y2 = -0.5;

g(a);

function g(easing: Brease.Easing){
  easing.output.range = [0, 80];
  console.log(easing.keyframes(50).map(v => " ".repeat(50+v)+"*").join("\n"));
}