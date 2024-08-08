import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SvgComponent } from '../../../../shared/components/svg/svg.component';

@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [
    CommonModule,
    SvgComponent,
    TranslateModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './error500.component.html',
  styleUrls: ['../errors.component.scss'],
})
export class Error500Component {}
