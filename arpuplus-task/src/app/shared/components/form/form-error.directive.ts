import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[formError]',
  standalone: true,
})
export class FormErrorDirective {
  templateRef = inject(TemplateRef);
  vcr = inject(ViewContainerRef);
}
