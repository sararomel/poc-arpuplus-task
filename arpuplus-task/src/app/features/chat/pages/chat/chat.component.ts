
import { HttpService } from '../../../../core/services/http/http.service';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ChattHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatTempleteComponent } from "./components/chat-templete/chat-templete.component";

@Component({
    selector: 'app-chat',
    standalone: true,
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ChattHeaderComponent, ChatTempleteComponent]
})
export class ChatComponent implements OnInit {
  httpService = inject(HttpService);
  // product$!: Observable<ProductGetResponse>;

  ngOnInit(): void {
    // this.product$ = this.httpService.get<ProductGetResponse>('product/');
  }
}
