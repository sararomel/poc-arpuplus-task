import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-input-radio-button',
  standalone: true,
  imports: [RadioButtonModule, ReactiveFormsModule , CommonModule],
  templateUrl: './input-radio-button.component.html',
  styleUrl: './input-radio-button.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputRadioButtonComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() maxMumValue!: string;
  @Input() miniMumValue!: string;
  @Input() options: { label: string, value: any }[] = []; // Options for radio buttons

  @Output() valueChange = new EventEmitter<any>(); // EventEmitter for value changes
  
  get control(): AbstractControl | null {
    return this.parentForm?.get(this.controlName);
  }
  ngOnInit(): void {
    // Subscribe to the value changes of the control
    this.control?.valueChanges.subscribe(value => {
      this.valueChange.emit(value); // Emit the new value
    });
  }


}
