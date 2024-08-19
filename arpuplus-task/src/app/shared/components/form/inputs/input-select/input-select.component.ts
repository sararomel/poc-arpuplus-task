import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect'; // Multiple select dropdown

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, MultiSelectModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() options: { label: string, value: any }[] = []; // Options for the dropdown
  @Input() multiple: boolean = false; // Determines single or multiple select
  @Output() valueChange = new EventEmitter<any>(); // EventEmitter for value changes

  get control() {
    return this.parentForm?.get(this.controlName);
  }
  ngOnInit(): void {

  }
  onValueChanged(event: DropdownChangeEvent) {
    this.valueChange.emit(event?.value)
  }
  
}
