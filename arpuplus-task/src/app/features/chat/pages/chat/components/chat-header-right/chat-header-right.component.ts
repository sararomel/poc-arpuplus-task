import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat-header-right',
  standalone: true,
  imports: [MatIconModule, MatInputModule],
  templateUrl: './chat-header-right.component.html',
  styleUrl: './chat-header-right.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeaderRightComponent {}
