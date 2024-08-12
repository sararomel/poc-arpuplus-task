import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-input-datetime',
  standalone: true,
  imports: [ReactiveFormsModule
    , CalendarModule,
  ],
  templateUrl: './input-datetime.component.html',
  styleUrl: './input-datetime.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDatetimeComponent {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() type: 'date' | 'datetime-local' = 'date'; // Default type
  @Input() miniMumValue?: number;
  @Input() maxMumValue?: number;
  get control(): AbstractControl | null {
    return this.parentForm.get(this.controlName);
  }



  // Utility to check if the control has the required validator
  hasRequiredValidator(control: AbstractControl): boolean | null {
    if (control?.validator) {
      const validatorFn = control.validator({} as AbstractControl);
      return validatorFn && validatorFn.hasOwnProperty('required');
    }
    return false;
  }
}
