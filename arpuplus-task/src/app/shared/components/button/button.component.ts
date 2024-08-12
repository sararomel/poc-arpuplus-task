import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() isPrimary: boolean = false;
  @Input() imgSrc!: string;
  @Input() buttonTitle: string = '';
  @Input() isDisabled: boolean = false;

  @Output() actionClicked = new EventEmitter<void>();
  //tragger action clicked
  actionClick(): void {
    this.actionClicked.emit()
  }
}
