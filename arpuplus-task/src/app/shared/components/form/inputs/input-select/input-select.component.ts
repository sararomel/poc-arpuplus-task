import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect'; // Multiple select dropdown

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [ReactiveFormsModule,DropdownModule,MultiSelectModule ],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectComponent {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() options: { label: string, value: any }[] = []; // Options for the dropdown
  @Input() multiple: boolean = false; // Determines single or multiple select

  get control() {
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
