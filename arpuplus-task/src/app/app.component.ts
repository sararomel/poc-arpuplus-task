import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, concatMap, filter, map, switchMap } from 'rxjs';
import { Lang } from './core/constants/language';
import { LocalStorageService } from './core/services/local-storage/local-storage.service';
import { TranslationService } from './core/services/translation/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private readonly currentLang: string;
  private readonly projectNameTranslationKey = 'MENU.PROJECT_NAME';

  localStorage = inject(LocalStorageService);
  translationService = inject(TranslationService);
  titleService = inject(Title);
  translate = inject(TranslateService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  subscriptions = new Subscription();
  constructor() {
    this.currentLang = this.localStorage.getItem('userLang') ?? Lang.English;

    this.translate.setDefaultLang(this.currentLang);
    this.setPageTitle();
  }
  ngAfterViewInit(): void {
    this.translationService.adjustFonts();
  }
  setPageTitle() {
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((e) => e instanceof NavigationEnd),
          map(() => {
            let route = this.activatedRoute.firstChild;
            let child = route;
            while (child) {
              if (child.firstChild) {
                child = child.firstChild;
                route = child;
              } else {
                child = null;
              }
            }
            return route;
          }),
          switchMap((route) => route!.data),
          map((data) => `MENU.${data['title']}`),
          concatMap((title) =>
            this.translate
              .get([this.projectNameTranslationKey, title])
              .pipe(map((translatedValue) => [translatedValue, title])),
          ),
          map(
            ([translatedValue, title]) =>
              `${translatedValue[this.projectNameTranslationKey]} | ${
                translatedValue[title]
              }`,
          ),
        )
        .subscribe((title) => {
          this.titleService.setTitle(title);
        }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
