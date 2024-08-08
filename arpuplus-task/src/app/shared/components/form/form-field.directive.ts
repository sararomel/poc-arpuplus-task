import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { fromEvent, merge, skip, startWith } from 'rxjs';
import { ErrorMessagePipe } from './error-message.pipe';
import { FormErrorDirective } from './form-error.directive';

@Directive({
  selector: `mat-form-field`,
  standalone: true,
  providers: [ErrorMessagePipe],
})
export class MatFormFieldDirective implements AfterViewInit {
  el: ElementRef<HTMLElement> = inject(ElementRef);
  vcr = inject(ViewContainerRef);
  errorMessagePipe = inject(ErrorMessagePipe);
  @ContentChild(NgControl) childFormControl!: NgControl;
  @ContentChild(FormErrorDirective) childFormError!: FormErrorDirective;
  view: EmbeddedViewRef<any> | null = null;
  ngAfterViewInit(): void {
    merge(
      this.childFormControl.statusChanges!,
      fromEvent(this.el.nativeElement, 'focusout'),
    )
      .pipe(
        startWith(this.childFormControl.status),
        skip(this.childFormControl instanceof NgModel ? 1 : 0),
      )
      .subscribe(() => {
        if (this.childFormControl.touched) {
          Object.entries(this.childFormControl.control?.errors || {}).forEach(
            ([key, value]) => {
              this.vcr.clear();
              this.view?.destroy();
              this.view = this.childFormError.vcr.createEmbeddedView(
                this.childFormError.templateRef,
              );
              this.view.rootNodes[0].innerHTML =
                this.errorMessagePipe.transform(key, value);
              this.view.markForCheck();
            },
          );
        }
      });
  }
}
