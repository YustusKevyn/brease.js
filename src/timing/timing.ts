import type { MotionConfiguration } from "../motion";

import { Motion } from "../motion";

export abstract class Timing {
  abstract clone(): Timing;
  protected abstract calculate(x: number): number;
  
  at(x: number){
    if(x <= 0) return 0;
    if(x >= 1) return 1;
    return this.calculate(x);
  }

  keyframes(n: number){
    let final: number[] = [0];
    for(let i = 1; i < n-1; i++) final.push(this.calculate(1/(n-1)*i));
    final.push(1);
    return final;
  }

  toMotion(config: MotionConfiguration){
    return new Motion(this, config);
  }
}