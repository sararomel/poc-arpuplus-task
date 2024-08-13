import { Component, Input, inject, signal, effect, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from "../../../../../../../shared/components/form/inputs/input-select/input-select.component";
import { ButtonComponent } from "../../../../../../../shared/components/button/button.component";
import { InputTextComponent } from "../../../../../../../shared/components/form/inputs/input-text/input-text.component";

@Component({
  selector: 'app-user-attribute-segments-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputSelectComponent, ButtonComponent, InputTextComponent],
  templateUrl: './user-attribute-segmants-form.component.html',
  styleUrls: ['./user-attribute-segmants-form.component.scss']
})
export class UserAttributeSegmentsFormComponent {
  @Input() groupName!: string;
  @Input() userFormArrayName!: string;

  userattrributeFormGroup!: FormGroup;

  attributeOptions = [
    { label: 'String', value: 'string' },
    { label: 'Number', value: 'number' },
    { label: 'Date', value: 'date' }
  ];

  operatorOptions = [
    { label: 'Equals', value: 'equals' },
    { label: 'Not Equals', value: 'notEquals' }
  ];

  durationOptions = [
    { label: 'Days', value: 'days' },
    { label: 'Months', value: 'months' }
  ];

  constructor(private fb: FormBuilder, private formGroupDirective: FormGroupDirective) { }

  ngOnInit(): void {
    this.userattrributeFormGroup = this.formGroupDirective.control.get(this.groupName) as FormGroup;
    this.addUserAttribute();

  }

  get userAttributes(): FormArray {
    return this.userattrributeFormGroup.get(this.userFormArrayName) as FormArray;
  }
  getuserAttributes(index: number): FormGroup {
    return this.userAttributes?.at(index) as FormGroup;
  }
  addUserAttribute(): void {
    this.userAttributes.push(this.fb.group({
      attributeType: [null, Validators.required],
      // operator: [null],  // Initialize control but might remove later
      // duration: [null],  // Initialize control but might remove later
      // additionalControl: [null]  // Initialize control but might remove later
    }));
  }

  onAttributeTypeChange(event: any, index: number): void {
    const control = this.userAttributes.at(index) as FormGroup;
    const type = event.value;

    // Clear existing controls
    control.removeControl('operator');
    control.removeControl('duration');
    control.removeControl('additionalControl');

    // Add controls based on the selected type
    if (type === 'string') {
      control.addControl('operator', this.fb.control(null, Validators.required));
      control.addControl('duration', this.fb.control(null));
    } else if (type === 'number') {
      control.addControl('additionalControl', this.fb.control(null));
    } else if (type === 'date') {
      control.addControl('additionalControl2', this.fb.control(null));
    }
  }
}