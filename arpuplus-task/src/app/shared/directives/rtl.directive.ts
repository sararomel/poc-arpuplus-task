import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { TranslationService } from '../../core/services/translation/translation.service';

@Directive({
  selector: '[setRtl]',
  standalone: true,
})
export class RtlDirective {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private translation: TranslationService,
  ) {
    this.switchClassBasedOnLanguage();
  }
  switchClassBasedOnLanguage(): void {
    this.translation.isArabic$.subscribe((arabic) => {
      arabic
        ? this.renderer.addClass(this.elRef.nativeElement, 'rtl')
        : this.renderer.removeClass(this.elRef.nativeElement, 'rtl');
    });
  }
}
