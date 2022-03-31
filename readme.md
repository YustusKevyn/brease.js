<div align="center">
  <img width="80" src="breeze.png"/>
  <h1>brease.js</h1>
  <p><b>All-in-one adjustable easing functions library</b></p>
  <p>
    • Penner's easing functions<br/>
    • Custom elastic curve functions<br/>
    • Custom step/staircase functions<br/>
    • Custom cubic Bézier curve functions<br/>
    <br/>
    • In, out, in-out and out-in variants<br/>
    • Adjustable input and output range<br/>
    • Supports IntelliSense and TypeScript<br/>
    • No dependencies, no framework cruft<br/>
  </p>
</div>

<br/>
<br/>

## Getting started

### Installation

Via npm:

```bash
$ npm i brease.js
```

### Usage 

ESM:
```ts
import { Easing, Penner, Bezier, Steps, Elastic } from "brease.js";
```

CJS:
```ts
const { Easing, Penner, Bezier, Steps, Elastic } = require("brease.js");
```

### Example 

A simple eased animation using a Penner function to translate a circle on the x-axis from -100px to 100px during 1000ms.

```ts
import { Penner } from "brease.js";

let duration = 1000,
start = performance.now(),
element = document.getElementById("circle"),
easing = new Penner("outQuint", 0, duration, -100, 100);

let tick = () => {
  let time = performance.now();
  element.style.transform = `translateX(${easing.at(time-start)}px)`;
  if(time-start < duration) requestAnimationFrame(tick);
};

tick();
```

# API 

## `Easing` 

### Constructor 

```ts
new Easing(easing?, t1?, t2?, o1?, o2?)
```

<dl>
  <dt><code>easing?: string | ((t: number) => number)</code></dt>
  <dd>The easing function to use. Can be a custom function or the name of a preset. A list of all supported presets can be found below. Default is <code>"linear"</code>.</dd>

  <dt><code>t1?: number</code></dt>
  <dd>Start of the input range, e.g. start time. Default is <code>0</code>.</dd>

  <dt><code>t2?: number</code></dt>
  <dd>End of the input range, e.g. end time. Indicates the easing's duration in combination with <code>t1</code>. Default is <code>1</code>.</dd>

  <dt><code>o1?: number</code></dt>
  <dd>Start of the output range, e.g. beginning value. Default is <code>0</code>.</dd>

  <dt><code>o1?: number</code></dt>
  <dd>End of the output range, e.g. ending value. Indicates the easing's change in value in combination with <code>o1</code>. Default is <code>1</code>.</dd>
</dl>

### Properties 

<dl>
  <dt><code>fn: (t: number) => number</code></dt>
  <dd>Returns the easing function adjusted to the easing's input and output range.</dd>

  <dt><code>time: Time</code></dt>
  <dd>
    Manages the easing's input range. Has the following sub-properties:
    <ul>
      <li><code>start: number</code> Sets/gets the start.</li>
      <li><code>end: number</code> Sets/gets the end.</li>
      <li><code>duration: number</code> Sets/gets the duration.</li>
      <li><code>range: [start: number, end: number]</code> Sets/gets the <code>start</code> and <code>end</code> using an array.</li>
    </ul>
  </dd>

  <dt><code>output: Ouput</code></dt>
  <dd>
    Manages the easing's output range. Has the following sub-properties:
    <ul>
      <li><code>start: number</code> Sets/gets the start.</li>
      <li><code>end: number</code> Sets/gets the end.</li>
      <li><code>delta: number</code> Sets/gets the change in value.</li>
      <li><code>range: [start: number, end: number]</code> Sets/gets the <code>start</code> and <code>end</code> using an array.</li>
    </ul>
  </dd>
</dl>

### Methods 

<dl>
  <dt><code>at(t: number): number</code></dt>
  <dd>Returns the output value for the specified time.</dd>

  <dt><code>keyframes(n: number): number[]</code></dt>
  <dd>Returns an array of output values by splitting the easing into <code>n</code> equal parts.</dd>

  <dt><code>inverse()</code></dt>
  <dd>Inverts the easing.</dd>

  <dt><code>clone()</code></dt>
  <dd>Returns a new instance with the same easing function and input and output range.</dd>
</dl>

### Presets 

- `"linear"`
- `"ease"`, `"easeIn"`, `"easeOut"` and `"easeInOut"`
- `"stepStart"` and `"stepEnd"`
- All [Penner functions](#functions), prefixed with "ease" (e.g. `"outQuint"` → `"easeOutQuint"`)

### Example 

```ts
let easing = new Easing("easeOutQuint", 0, 100, -200, 200);
// → input ranges from 0 to 100 
// → output ranges from -200 to 200 

easing.output.start -= 200;
// → output ranges from -400 to 200 

easing.time.range = [0, 1];
// → output ranges from 0 to 1 

easing.output.delta = 400;
// → output ranges from -400 to 0 

easing.invert();
// → output ranges from 0 to -400 
```

## `Penner` 

This class can be used to quickly create an easing using one of Robert Penner's functions. All functions work identically to Penner's. Extends `Easing`.

### Constructor 

```ts
new Penner(name, ...args?)
```

<dl>
  <dt><code>name: string</code></dt>
  <dd>Name of Penner function. A list of all supported names can be found below.</dd>

  <dt><code>...args?</code></dt>
  <dd>The same arguments as <code>Easing</code>.</dd>
</dl>

### Functions 

Each of Penner's functions has an in, out, in-out and out-in variant. If you want to learn more about these functions, visit [easings.net ↗](https://easings.net/).

|               | ***In***  | ***Out***  | ***In-Out*** | ***Out-In*** |
| ------------- | --------- | ---------- | ------------ | ------------ |
| ***Quad***    | inQuad    | outQuad    | inOutQuad    | outInQuad    |
| ***Circ***    | inCubic   | outCubic   | inOutCubic   | outInCubic   |
| ***Quart***   | inQuart   | outQuart   | inOutQuart   | outInQuart   |
| ***Quint***   | inQuint   | outQuint   | inOutQuint   | outInQuint   |
| ***Expo***    | inExpo    | outExpo    | inOutExpo    | outInExpo    |
| ***Sine***    | inSine    | outSine    | inOutSine    | outInSine    |
| ***Circ***    | inCirc    | outCirc    | inOutCirc    | outInCirc    |
| ***Back***    | inBack    | outBack    | inOutBack    | outInBack    |
| ***Elastic*** | inElastic | outElastic | inOutElastic | outInElastic |

## `Bezier` 

This class can be used to create a custom cubic Bézier curve easing. You can use a [Bézier curve generator ↗](http://cubic-bezier.com/) to visualise the curve and generate the corresponding parameters. Extends `Easing`.

### Constructor 

```ts
new Bezier(x1, y1, x2, y2, ...args?)
```

<dl>
  <dt><code>x1: number</code></dt>
  <dd>X coordinate of P1. Must be between 0 and 1.</dd>

  <dt><code>y1: number</code></dt>
  <dd>X coordinate of P1.</dd>

  <dt><code>x2: number</code></dt>
  <dd>X coordinate of P2. Must be between 0 and 1.</dd>

  <dt><code>y2: number</code></dt>
  <dd>Y coordinate of P2.</dd>

  <dt><code>...args?</code></dt>
  <dd>The same arguments as <code>Easing</code>.</dd>
</dl>

## `Steps` 

This class can be used to define a step function. Divides the output range into equidistant steps. Visit the [MDN docs ↗](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#the_steps_class_of_easing_functions) for more information. Extends `Easing`.

### Constructor 

```ts
new Steps(number, direction?, ...args?)
```

<dl>
  <dt><code>number: number</code></dt>
  <dd>The number of equidistant steps that make up the function. Must be a strictly positive integer.</dd>

  <dt><code>direction?: string</code></dt>
  <dd>
    Indicates if the function is left- or right-continuous. Must be one of:
    <ul>
      <li><code>"start"</code>: Denotes a left-continuous function. The first step happens when the interpolation begins.</li>
      <li><code>"end"</code>: Denotes a right-continuous function. The last step happens when the interpolation ends.</li>
      <li><code>"both"</code>: Denotes a right and left continuous function. Includes a pause at the start and end of the interpolation.</li>
      <li><code>"none"</code>: There is no jump on either end. The value is held at the start and end of the interpolation.</li>
    </ul>
    The default is <code>"end"</code>
  </dd>

  <dt><code>...args?</code></dt>
  <dd>The same arguments as <code>Easing</code>.</dd>
</dl>

## `Elastic` 

This class can be used to define a custom elastic curve easing. Extends `Easing`. 

### Constructor 

```ts
new Elastic(amplitude?, period?, direction?, ...args?)
```

<dl>
  <dt><code>amplitude?: number</code></dt>
  <dd>Amplitude, i.e. overshoot of the curve. Must be at least 1. Default is <code>1</code>.</dd>

  <dt><code>period?: number</code></dt>
  <dd>Period, i.e. how many times the curve goes back and forth. The smaller the number, the more times the curve goes back and forth. Must be larger than 0. Default is <code>0.3</code>.</dd>

  <dt><code>direcrion?: string</code></dt>
  <dd>Direction of the easing function. Must be one of <code>"in"</code>, <code>"out"</code>, <code>"inOut"</code> and <code>"outIn"</code>. Default is <code>"in"</code>.</dd>

  <dt><code>...args?</code></dt>
  <dd>The same arguments as <code>Easing</code>.</dd>
</dl>