import Brease from "./src";

console.clear();
console.log(new Date().getTime());

// g(new Brease.BounceEasing(5, 1, "in"));

function g(easing: Brease.Easing){
  easing.output.range = [0, 80];
  console.log(easing.keyframes(50).map(v => " ".repeat(50+v)+"*").join("\n"));
}