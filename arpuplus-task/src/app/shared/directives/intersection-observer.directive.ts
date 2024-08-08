import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, debounceTime } from 'rxjs';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true,
})
export class IntersectionObserverDirective implements OnInit {
  @Input() includeRoot = false;
  @Input() rootMargin = '0px 0px 0px 0px';
  @Input() threshold = 0.5;
  @Input() debounceTime = 250;
  @Input() isContinuous = false;

  @Output() isIntersecting = new EventEmitter<boolean>();
  root: HTMLElement | null = null;
  private _isIntersecting = false;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    if (this.includeRoot) {
      this.root = this.element.nativeElement;
    }
    this.createAndObserve();
  }

  createAndObserve() {
    const options: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };
    return new Observable<boolean>((subscriber) => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        subscriber.next(isIntersecting);
        isIntersecting &&
          !this.isContinuous &&
          intersectionObserver.disconnect();
      }, options);

      intersectionObserver.observe(this.element.nativeElement);

      return {
        unsubscribe() {
          intersectionObserver.disconnect();
        },
      };
    })
      .pipe(debounceTime(this.debounceTime))
      .subscribe((status) => {
        this.isIntersecting.emit(status);
        this._isIntersecting = status;
      });
  }
}
