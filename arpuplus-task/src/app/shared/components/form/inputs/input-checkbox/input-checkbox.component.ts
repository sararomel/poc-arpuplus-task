import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCheckboxComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() maxMumValue!: string;
  @Input() miniMumValue!: string;
  @Output() valueChange = new EventEmitter<any>(); // EventEmitter for value changes

  get control(): AbstractControl | null {
    return this.parentForm.get(this.controlName);
  }
  ngOnInit(): void {
    // Subscribe to the value changes of the control
    this.control?.valueChanges.subscribe(value => {
      this.valueChange.emit(value); // Emit the new value
    });
  }

}
