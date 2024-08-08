import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../../constants/language';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private _currentLang = signal(Lang.English);
  private readonly renderer: Renderer2;
  private readonly _isArabic = signal(false);

  public readonly isArabic = this._isArabic.asReadonly();
  public readonly currentLang = this._currentLang.asReadonly();
  constructor(
    private translate: TranslateService,
    private rendererFactory: RendererFactory2,
    private localStorage: LocalStorageService,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.init();
  }

  /**
   * Initializes the application by checking the current user language setting
   *  in local storage. If no language setting is found, sets the language to the
   *  default language specified in the AppConfig. Then, adjusts the application
   *  based on the selected language.
   */
  init(): void {
    const selectedLang = this.localStorage.getItem('userLang');

    if (!selectedLang) {
      this._currentLang.set(Lang.English);
      this.localStorage.setItem('userLang', this._currentLang());
    } else {
      this._currentLang.set(selectedLang as Lang);
    }
    this.adjustApp();
  }

  /**
   * Changes the user language setting by reloading the page, setting the new
   *  language, updating the language setting in local storage, and adjusting the
   *  application based on the selected language.
   */

  changeLang(): void {
    window.location.reload();
    this._currentLang.update((lang) =>
      lang === Lang.English ? Lang.Arabic : Lang.English,
    );
    this.localStorage.setItem('userLang', this._currentLang());
    this.adjustApp();
    this.adjustFonts();
  }

  /**
   * Adjusts the application based on the selected language by updating the
   * translation service with the new language, adding or removing the 'rtl'
   * class to the body element for right-to-left language support, and updating
   *  the isArabic BehaviorSubject to reflect the selected language.
   */

  adjustApp(): void {
    this.translate.use(this._currentLang());
    if (this._currentLang() === Lang.Arabic) {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer.setAttribute(document.documentElement, 'lang', 'ar');
      this._isArabic.set(true);
    } else {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer.setAttribute(
        document.documentElement,
        'lang',
        this._currentLang(),
      );
      this._isArabic.set(false);
    }
  }

  adjustFonts() {
    const root = document.querySelector(':root') as HTMLElement;
    const rootStyle = getComputedStyle(root);

    const fontDisplayEn = rootStyle.getPropertyValue('--font-display-en');
    const fontDisplayAr = rootStyle.getPropertyValue('--font-display-ar');

    const fontHeadlineEn = rootStyle.getPropertyValue('--font-headline-en');
    const fontHeadlineAr = rootStyle.getPropertyValue('--font-headline-ar');

    const fontTitleEn = rootStyle.getPropertyValue('--font-title-en');
    const fontTitleAr = rootStyle.getPropertyValue('--font-title-ar');

    const fontBodyEn = rootStyle.getPropertyValue('--font-body-en');
    const fontBodyAr = rootStyle.getPropertyValue('--font-body-ar');

    const fontLabelEn = rootStyle.getPropertyValue('--font-label-en');
    const fontLabelAr = rootStyle.getPropertyValue('--font-label-ar');

    if (this._currentLang() === Lang.Arabic) {
      root.style.setProperty('--font-display', fontDisplayAr);
      root.style.setProperty('--font-headline', fontHeadlineAr);
      root.style.setProperty('--font-title', fontTitleAr);
      root.style.setProperty('--font-body', fontBodyAr);
      root.style.setProperty('--font-label', fontLabelAr);
    } else {
      root.style.setProperty('--font-display', fontDisplayEn);
      root.style.setProperty('--font-headline', fontHeadlineEn);
      root.style.setProperty('--font-title', fontTitleEn);
      root.style.setProperty('--font-body', fontBodyEn);
      root.style.setProperty('--font-label', fontLabelEn);
    }
  }
  /**
   * Retrieves a translated value using the provided translation key.
   * @param value - The translation key for the desired value.
   * @returns The translated value corresponding to the given key.
   */

  getTransValue(value: string) {
    return this.translate.instant(value);
  }
}
