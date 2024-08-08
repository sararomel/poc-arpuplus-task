import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http/http.service';
import { FooterGetResponse } from './models/footer.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  footer$!: Observable<FooterGetResponse>;
  httpService = inject(HttpService);

  ngOnInit() {
    // this.footer$ = this.httpService.get<FooterGetResponse>('footer/');
  }
}
