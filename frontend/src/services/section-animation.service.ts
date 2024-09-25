import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionAnimationService {

  observeElements(elements: NodeListOf<HTMLElement>): void {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach((el) => observer.observe(el));
  }

  getElementsByClass(elRef: ElementRef, className: string): NodeListOf<HTMLElement> {
    return elRef.nativeElement.querySelectorAll(`.${className}`);
  }
}
