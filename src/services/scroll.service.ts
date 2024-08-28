import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollToAnchor(anchorId: string): void {
    const anchor = document.getElementById(anchorId);
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center', });
    }
  }
}
