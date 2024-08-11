import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  RendererFactory2,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { getBreakpointValue } from '../../../shared/utils/breakpoints-utils';
import { mediaMin } from '../../../shared/utils/media-utils';
import { HttpService } from '../../services/http/http.service';
import { TranslationService } from '../../services/translation/translation.service';
import { MenuComponent } from '../menu/menu.component';
import { HeaderNavItem } from './models/header.models';
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent, TranslateModule, RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent
  extends BaseComponent
  implements AfterViewInit, OnInit {
  rendererFactory = inject(RendererFactory2);
  translationService = inject(TranslationService);
  httpService = inject(HttpService);
  cdr = inject(ChangeDetectorRef);

  navs: HeaderNavItem[] = [];
  largeScreen$ = mediaMin(getBreakpointValue('lg'));
  renderer!: Renderer2;
  @ViewChild('headerRef') headerRef!: ElementRef;
  logo!: string;

  ngOnInit(): void {
    this.navs = [
      { name: 'MENU.HOME', url: '/home' },
      { name: 'Our Products', url: '' },
      { name: 'Who we are', url: '' },
      { name: 'Our partners', url: '' },
      { name: 'Testimonials', url: '' },
      { name: 'Pricing', url: '' },
      { name: 'Contact us', url: '' },];
  }
  ngAfterViewInit(): void {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.cloneHeader();
  }

  cloneHeader() {
    const clonedHeader = this.headerRef.nativeElement.cloneNode(true);
    this.renderer.addClass(clonedHeader, 'header--relative');

    this.renderer.appendChild(
      this.headerRef.nativeElement.parentElement,
      clonedHeader,
    );
  }

  onChangeLang() {
    this.translationService.changeLang();
  }
}
