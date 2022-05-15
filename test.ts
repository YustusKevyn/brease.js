import Brease from "./src";

console.clear();
console.log(new Date().getTime());

// console.log(Brease.parseEasing("polynomial(1)"));

function g(easing: Brease.Easing){
  easing.output.range = [0, 80];
  console.log(easing.keyframes(50).map(v => " ".repeat(50+v)+"*").join("\n"));
}