import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationService } from '../../services/animation/animation.service';
import { TranslationService } from '../../services/translation/translation.service';
import { HeaderNavItem } from '../header/models/header.models';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    AnimationService.advancedCustom({
      triggerName: 'menu',
      transitions: [
        {
          stateChangeExpr: ':enter',
          style: {
            opacity: '0',
            transform: 'translateX(-100%)',
          },
          animates: [
            {
              style: {
                opacity: '1',
                transform: 'none',
              },
            },
          ],
        },
        {
          stateChangeExpr: ':leave',
          style: {
            opacity: '1',
            transform: 'none',
          },
          animates: [
            {
              style: {
                opacity: '0',
                transform: 'translateX(-100%)',
              },
            },
          ],
        },
      ],
    }),
  ],
})
export class MenuComponent {
  showMenu = false;
  @Input() navs!: HeaderNavItem[];
  @ViewChild('icon') menuIconRef!: ElementRef<HTMLDivElement>;
  constructor(private translation: TranslationService) {}
  openMobileMenu(): void {
    if (this.showMenu) {
      this.closeMobileMenu();
      return;
    }
    this.showMenu = true;
    this.menuIconRef.nativeElement.classList.add('menu__icon--open');
  }

  closeMobileMenu(): void {
    this.showMenu = false;
    this.menuIconRef.nativeElement.classList.remove('menu__icon--open');
  }
  onChangeLang() {
    this.translation.changeLang();
  }
}
