import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule ,CommonModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberComponent {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() maxMumValue!: string;
  @Input() miniMumValue!: string;

  get control(): AbstractControl | null {
    return this.parentForm?.get(this.controlName);
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
