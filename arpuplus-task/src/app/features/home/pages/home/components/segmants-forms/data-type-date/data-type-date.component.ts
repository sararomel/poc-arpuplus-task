import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, FormArray, ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from '../../../../../../../shared/components/form/inputs/input-select/input-select.component';
import { InputNumberComponent } from '../../../../../../../shared/components/form/inputs/input-number/input-number.component';
import { InputDatetimeComponent } from '../../../../../../../shared/components/form/inputs/input-datetime/input-datetime.component';
import { DateTypeDefaultComponent } from "../date-types-case/date-type-default/date-type-default.component";
import { DateTypeBetweenComponent } from "../date-types-case/date-type-between/date-type-between.component";
import { DateTypeAtComponent } from "../date-types-case/date-type-at/date-type-at.component";

@Component({
  selector: 'app-data-type-date',
  standalone: true,
  imports: [ReactiveFormsModule, InputSelectComponent, InputNumberComponent, InputDatetimeComponent, DateTypeDefaultComponent, DateTypeBetweenComponent, DateTypeAtComponent],
  templateUrl: './data-type-date.component.html',
  styleUrl: './data-type-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTypeDateComponent {
  basicInfoGroup!: FormGroup; // Local property to hold the specific FormGroup
  @Input() groupName!: string; // Input to receive the group name
  @Input() arrayName!: string;
  @Input() indexOfArray!: number;
  dropdownOptions: { label: string, value: number }[] = [
    { label: 'All case ', value: 1 },
    { label: 'Between Case', value: 2 },
    { label: 'At Case', value: 3 },
  ]
  dropdownOptionsDuration: { label: string, value: number }[] = [
    { label: 'Date ', value: 1 },
    { label: 'Last', value: 2 },
    { label: 'Next', value: 3 },
  ]
  dropdownOptionsUnits: { label: string, value: number }[] = [
    { label: 'Today ', value: 1 },
    { label: 'MOnths', value: 2 },
    { label: 'Weeks', value: 3 },
  ]

  constructor(private formGroupRoot: FormGroupDirective) { }

  ngOnInit(): void {
    // Get the specific FormGroup from the root FormGroup using the name passed
    let array = this.formGroupRoot?.control?.get(this.arrayName) as FormArray;
    this.basicInfoGroup = array?.at(this.indexOfArray)?.get(this.groupName) as FormGroup;
  }
  getFormGroupName(name: string): FormGroup {
    return this.basicInfoGroup?.get(name) as FormGroup;
  }
  getNestedFormGroupName(name1: string ,name2:string): FormGroup {
    return this.basicInfoGroup?.get(name1)?.get(name2) as FormGroup;
  }
}


