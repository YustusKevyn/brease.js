import Brease from "./src";

console.clear();
console.log("-".repeat(80));
console.log(new Date().getTime());

let spring = new Brease.Spring({mass: 10, stiffness: 180, damping: 20});
// display(spring);

let back = new Brease.BackEasing({overshoot: 2})
// display(back);

let bezier = new Brease.BezierEasing({x1: 0.4, x2: 0.4});
// display(bezier);

function display(timing: Brease.Timing, n = 50){
  let m = timing.toMotion({from: 20, to: 100, start: 100, end: 10000});
  console.log(m.keyframes(n).map(f => f < 0 ? "" : " ".repeat(Math.round(f))+"*").join("\n"));
}