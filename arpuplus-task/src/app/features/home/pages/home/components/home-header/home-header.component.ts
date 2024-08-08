import { HomeGetResponse } from '../../../..';

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-header',

  standalone: true,
  imports: [TranslateModule],

  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  @Input() home!: HomeGetResponse;
}
