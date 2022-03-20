<div align="center">
  <img width="80" src="breeze.png"/>
  <h1>brease.js</h1>
  <p><b>Adjustable easing functions</b></p>
  <p>
    • Supports Penner's easing functions<br/>
    • Supports cubic Bézier curves<br/>
    • No dependencies, no framework cruft<br/>
    • Adjustable input and output ranges<br/>
  </p>
</div>

<br/>
<br/>

## Getting started

### Download

Via npm:

```bash
npm i brease-js
```

### Usage

A simple eased animation using a Penner function to translate a circle on the x-axis from -100px to 100px during 1000ms.

```javascript
import { Easing } from "brease-js";

let duration = 1000,
start = performance.now(),
element = document.getElementById("circle"),
easing = new Easing("outQuint", 0, duration, -100, 100);

let tick = () => {
  let time = performance.now();
  element.style.transform = `translateX(${easing.at(time-start)}px)`;
  if(time-start < duration) requestAnimationFrame(tick);
};

tick();
```

You can also retrieve only the easing function itself:

```javascript
let easing = new Easing("outQuint").fn;
```

## API

### `Easing`

Constructor: `(fn, t1?, t2?, p1?, p2?)`

| Argument                                | Description                                                                   | Default    |
| --------------------------------------- | ----------------------------------------------------------------------------- | ---------- |
| `fn: ((t: number) => number) \| string` | Easing function, name of [penner function](#penners-functions), or `"linear"` | `"linear"` |
| `t1?: number`                           | Start time                                                                    | `0`        |
| `t2?: number`                           | End time                                                                      | `1`        |
| `p1?: number`                           | Start progression value                                                       | `0`        |
| `p2?: number`                           | End progression value                                                         | `1`        |

**Properties and Methods:**

| Name                             | Description                                                                |
| -------------------------------- | -------------------------------------------------------------------------- |
| `time: Time`                     | *→ see: [time](#time)*                                                     |
| `progress: Progress`             | *→ see: [progress](#progress)*                                             |
| `fn: (t: number) => number`      | Returns the easing function adjusted to the easing's `time` and `progress` |
| `at(t: number): number`          | Returns the progress at the specified time                                 |
| `keyframes(n: number): number[]` | Returns an array of values by splitting the progress into `n` parts        |
| `invert(): void`                 | Inverts the easing                                                         |
| `clone(): Easing`                | Returns a new easing instance with the same time and progress              |

### `Time`

Manages the easing's start and end time thus defininig the range of the input value

**Properties and Methods:**

| Name                                  | Description                                                                   |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `start: number`                       | Sets/gets the start time                                                      |
| `end: number`                         | Sets/gets the end time                                                        |
| `duration: number`                    | Sets/gets the duration. Automatically adjusts the value of `end` when changed |
| `range: [start: number, end: number]` | Sets/gets the `start` and `end` as an array                                   |

**Example:**

```javascript
let easing = new Easing("outQuint");
easing.time.start = 10; // start = 10, end = 0
easing.time.duration = 100; // start = 10, end = 110
easing.time.range = [-1, 1]; // start = -1, end = 1
easing.at(0) // → 0.5
```

### `Progress`

Manages the start and end value of the easing's progression thus defining the range of the output value

**Properties and Methods:**

| Name                                  | Description                                                                |
| ------------------------------------- | -------------------------------------------------------------------------- |
| `start: number`                       | Sets/gets the start value                                                  |
| `end: number`                         | Sets/gets the end value                                                    |
| `delta: number`                       | Sets/gets the delta. Automatically adjusts the value of `end` when changed |
| `range: [start: number, end: number]` | Sets/gets the `start` and `end` as an array                                |

**Example:**

```javascript
let easing = new Easing("outQuint");
easing.progress.start = -100; // start = -100, end = 0
easing.progress.delta = 50; // start = -100, end = -50
easing.progress.range = [-100, -200]; // start = -100, end = -200
easing.invert();
easing.at(0) // → -200
```

## Penner's Functions 

Each penner function has an in, out, in-out and out-in variant. The following is a complete table with the name of all supported functions:

| In      | Out      | In-Out     | Out-In     |
| ------- | -------- | ---------- | ---------- |
| inQuad  | outQuad  | inOutQuad  | outInQuad  |
| inCubic | outCubic | inOutCubic | outInCubic |
| inQuart | outQuart | inOutQuart | outInQuart |
| inQuint | outQuint | inOutQuint | outInQuint |
| inExpo  | outExpo  | inOutExpo  | outInExpo  |
| inSine  | outSine  | inOutSine  | outInSine  |
| inCirc  | outCirc  | inOutCirc  | outInCirc  |
| inBack  | outBack  | inOutBack  | outInBack  |

For more information, visit [easings.net](https://easings.net/).

## Cubic Bézier Curves 

Bézier curve easings can be created using the `Bezier` object which extends the `Easing` class.

### `Bezier`

#### Consturctor: `(x1, y1, x2, y2, t1?, t2?, p1?, p2?)`

| Argument      | Description                                 |
| ------------- | ------------------------------------------- |
| `x1?: number` | x coordinate of P1. Must be between 0 and 1 |
| `y1?: number` | y coordinate of P1                          |
| `x2?: number` | x coordinate of P2. Must be between 0 and 1 |
| `y2?: number` | y coordinate of P2                          |
| ...           | Same arguments as `Easing`                  |

**Properties and Methods:**

All properties and methods from `Easing` are also available on `Bezier`.

**Example:**

```javascript
import { Bezier } from "brease-js";
let easing = new Bezier(0.22, 1, 0.36, 1);
```