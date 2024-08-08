import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appSnapScroll]',
  standalone: true,
})
export class SnapScrollDirective implements AfterViewInit {
  boxes: HTMLElement[] = [];
  heights!: number[];
  offsetY = -20;

  constructor(private el: ElementRef) {}

  @HostListener('window:resize')
  ngAfterViewInit(): void {
    setTimeout(() => {
      // Get all elements with class snap
      this.boxes = this.el.nativeElement.querySelectorAll('.snap');
      const set = new Set<number>([0]); // set is to ensure that the values are unique
      this.heights = [0]; // begin with heigt 0 the top of page

      // filling the set with the top of each box and its center
      for (const box of this.boxes.values()) {
        set.add(box.offsetTop);
        const halfDistance = box.offsetHeight / 2;

        if (halfDistance < 200) continue;
        set.add(box.offsetTop + box.offsetHeight / 2);
      }

      // Adding the end of the page point
      set.add(document.documentElement.scrollHeight);

      // transform set into array and sort it as set has no order
      this.heights = [...set.values()].sort((a, b) => a - b);
      for (let i = 1; i < this.heights.length - 1; ++i) {
        if (this.heights[i] - this.heights[i - 1] < 200) {
          this.heights.splice(i, 1);
        }
      }
    }, 100);
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const deltaY = event.deltaY;
    const currentTop = document.documentElement.scrollTop;
    let currentIndex = 0;

    // On Scroll down
    if (deltaY > 0) {
      for (let i = 0; i < this.heights.length; ++i) {
        if (this.heights[i] >= currentTop) {
          currentIndex = i;
          break;
        }
      }
      document.documentElement.scrollTo({
        top:
          this.heights[Math.min(currentIndex + 1, this.heights.length - 1)] +
          this.offsetY,
        behavior: 'smooth',
      });
    }
    // On Scroll up
    else if (deltaY < 0) {
      for (let i = this.heights.length - 1; i > 0; --i) {
        if (this.heights[i] <= currentTop) {
          currentIndex = i;
          break;
        }
      }
      document.documentElement.scrollTo({
        top: this.heights[Math.max(currentIndex, 0)] + this.offsetY,
        behavior: 'smooth',
      });
    }
  }
}
