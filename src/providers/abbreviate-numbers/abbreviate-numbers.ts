import { Injectable } from '@angular/core';

@Injectable()
export class AbbreviateNumbersProvider {

  constructor() {
  }

  // Based on: https://gist.github.com/tobyjsullivan/96d37ca0216adee20fa95fe1c3eb56ac - tobyjsullivan
  abbreviateNumber(num: any): string {
    let newValue = num;
    const suffixes = ["", "K", "M", "B","T"];  
    let suffixNum = 0;

    if (num < 1000) {
      return num;
    }
    else {
      while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
      }
    
      newValue = newValue.toPrecision(3);
      newValue += suffixes[suffixNum];

      return newValue;
    }
  }
}
