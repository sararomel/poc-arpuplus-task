import { Component, Input, inject, signal, effect, Inject, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from "../../../../../../../shared/components/form/inputs/input-select/input-select.component";
import { ButtonComponent } from "../../../../../../../shared/components/button/button.component";
import { InputTextComponent } from "../../../../../../../shared/components/form/inputs/input-text/input-text.component";
import { DataTypeTextComponent } from "../data-type-text/data-type-text.component";
import { DataTypeNumberComponent } from "../data-type-number/data-type-number.component";
import { DataTypeDateComponent } from "../data-type-date/data-type-date.component";

@Component({
  selector: 'app-user-attribute-segments-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputSelectComponent, ButtonComponent, InputTextComponent, DataTypeTextComponent, DataTypeNumberComponent, DataTypeDateComponent],
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
      dataTypeText: this.fb.group({
        operator: [null, Validators.required],
        textValue: [null, Validators.required]
      }),
      dataTypeNumber: this.fb.group({
        operator: [null, Validators.required],
        inCaseBetween: this.fb.group({
          numberValue1: [null, Validators.required],
          numberValue2: [null, Validators.required]
        }),
        inAllCaseWithoutBetween: this.fb.group({
          numberValue: [null, Validators.required],
        })
      }),
      dataTypeDate: this.fb.group({
        operator: [null, Validators.required],
        inCaseWithBetween: this.fb.group({
          duration: [null, Validators.required],
          durationLastOrNext: this.fb.group({
            unit: [null, Validators.required],
            numberValue1: [null, Validators.required],
            numberValue2: [null, Validators.required],
          }),
          durationWithDate: this.fb.group({
            dateValue1: [null, Validators.required],
            dateValue2: [null, Validators.required]
          })
        }),
        inAllCase: this.fb.group({
          duration: [null, Validators.required],
          durationLastOrNext: this.fb.group({
            unit: [null, Validators.required],
            numberValue: [null, Validators.required],
          }),
          durationWithDate: this.fb.group({
            dateValue: [null, Validators.required],
          })
        }),
        inCaseAt: this.fb.group({
          duration: [null, Validators.required],
          durationDate: this.fb.group({
            dateValue: [null, Validators.required],
          }),
        }),
      })
    }));
  }

  onAttributeTypeChange(event: any, index: number): void {
    const control = this.userAttributes.at(index) as FormGroup;
    const type = event.value;
    //remove controllers before start
    this.removeAllControllersBeforeStart(control);
    this.removeAllControllersForOperatorsBeforeStart(control);

    // Add controls based on the selected type
    if (type === 'string') {
      control.addControl('operator', this.fb.control(null, Validators.required));
    } else if (type === 'number') {
      control.addControl('additionalControl', this.fb.control(null));
    } else if (type === 'date') {
      control.addControl('additionalControl2', this.fb.control(null));
    }
  }
  onOperatorTypeChange(event: any, index: number): void {
    const control = this.userAttributes.at(index) as FormGroup;
    const type = event.value;
    //remove controllers before start
    this.removeAllControllersForOperatorsBeforeStart(control);
    // Add controls based on the selected type
    if (type === 'equals') {
      control.addControl('duration', this.fb.control(null));
      control.addControl('additionalContro3', this.fb.control(null));
    } else if (type === 'notEquals') {
      control.addControl('additionalControl4', this.fb.control(null));
    }
  }

  removeAllControllersBeforeStart(control: FormGroup): void {
    // Clear existing controls
    control.removeControl('operator');
    control.removeControl('additionalControl');
    control.removeControl('additionalControl2');

  }
  removeAllControllersForOperatorsBeforeStart(control: FormGroup): void {
    // Clear existing controls
    control.removeControl('duration');
    control.removeControl('additionalControl3');
    control.removeControl('additionalControl4');
  }
}