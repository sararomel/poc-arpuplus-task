import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CommonModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() maxMumValue!: string;
  @Input() miniMumValue!: string;
  control!: FormControl;
constructor(private cd:ChangeDetectorRef){}

  ngOnInit(): void {
    this.control = this.parentForm.get(this.controlName) as FormControl;
    this.cd.detectChanges(); // Manually trigger change detection

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
