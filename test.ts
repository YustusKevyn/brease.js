import Brease from "./src";

console.clear();
console.log("-".repeat(80));
console.log(new Date().getTime());

let spring = new Brease.Spring({mass: 1, stiffness: 40, damping: 120});