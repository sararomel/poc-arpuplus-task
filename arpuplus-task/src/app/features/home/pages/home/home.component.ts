import { Observable } from 'rxjs';

import { HttpService } from '../../../../core/services/http/http.service';

import { HomeGetResponse, HomeHeaderComponent } from '../..';

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  OnInit,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../../core/layout/header/header.component";
import { FooterComponent } from "../../../../core/layout/footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, HomeHeaderComponent, HeaderComponent, FooterComponent]
})
export class HomeComponent implements OnInit {
  httpService = inject(HttpService);
  home$!: Observable<HomeGetResponse>;

  ngOnInit(): void {
    // this.home$ = this.httpService.get<HomeGetResponse>('home/');
  }
}
