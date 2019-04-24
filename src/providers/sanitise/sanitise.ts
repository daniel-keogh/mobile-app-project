import { Injectable } from '@angular/core';

@Injectable()
export class SanitiseProvider {

  constructor() {
  }

  // Removes HTML tags from text.
  // Source: https://stackoverflow.com/a/5002161
  cleanText(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }

  // makes sure text entered by the user is OK before attaching it to a URL, by removing whitespace and it replacing with '+'.
  makeURLSafe(text: string): string {
    text = text.replace(/  +/g, ' ');
    text = text.split(' ').join('+');
    return text;
  }
}
