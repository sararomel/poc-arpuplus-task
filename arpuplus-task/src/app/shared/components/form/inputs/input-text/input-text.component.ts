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
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent implements OnInit {
  control!: FormControl;
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() maxMumValue!: string;
  @Input() miniMumValue!: string;

  ngOnInit(): void {
    this.control = this.parentForm.get(this.controlName) as FormControl;

  }
  getError(key: string): string {
    switch (key) {
      case 'required':
        return 'is required.';
      case 'minlength':
        return `must have at least ${this.miniMumValue} characters.`;
      case 'maxlength':
        return `cannot exceed ${this.maxMumValue} characters.`;
      default:
        return 'is invalid.'; // Handle other unhandled errors
    }
  }

}
