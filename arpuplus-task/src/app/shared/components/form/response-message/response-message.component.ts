import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-response-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseMessageComponent {
  @Input() showSuccessMessage = false;
  @Input() showErrorMessage = false;

  successMessage = `
      "Thank you for reaching out! Your message has landed safely in our inbox. We'll be reviewing it closely and providing you with the assistance you require. Stay tuned!"
  `;
  errorMessage = `
  "We're sorry to inform you that there was an issue with our contact form. Our team is actively working to resolve it. PLEASE TRY AGAIN LATER.
    Thank you for your understanding!"`;
}
