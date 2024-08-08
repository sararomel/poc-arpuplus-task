import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AnimationStates } from '../../../core/services/animation/animation.model';

@Directive()
export class BaseComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  animationState = AnimationStates.Hidden;
  onIntersecting(isIntersecting: boolean) {
    this.animationState = isIntersecting
      ? AnimationStates.Visible
      : AnimationStates.Hidden;
  }
}
