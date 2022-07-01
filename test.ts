import Brease from "./src";

console.clear();
console.log("-".repeat(80));
console.log(new Date().getTime());

let spring = new Brease.Spring({mass: 10, stiffness: 180, damping: 20, clamp: false});
display(spring);

// let bezier = new Brease.BezierEasing({x1: 0.4, x2: 0.4});
// display(bezier);

function display(easing: Brease.Easing | Brease.Spring, n = 50){
  easing = easing.clone({to: 80});
  console.log(easing.keyframes(n).map(f => " ".repeat(20+Math.round(f))+"*").join("\n"));
}