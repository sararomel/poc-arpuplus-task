import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatButtonModule, RouterLink],
  templateUrl: './error404.component.html',
  styleUrls: ['../errors.component.scss'],
})
export class Error404Component {}
