import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationService } from '../../../../core/services/animation/animation.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    AnimationService.move({
      direction: 'Down',
      distance: '1rem',
      duration: 200,
    }),
  ],
})
export class ErrorComponent {
  onStart() {
    console.log('START');
  }
}
