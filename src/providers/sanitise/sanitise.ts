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

  // Make the text URL safe (remove spaces with '+' etc.).
  makeURLSafe(text: string): string {
    text = text.replace(/  +/g, ' ');
    text = text.split(' ').join('+');
    return text;
  }
}
