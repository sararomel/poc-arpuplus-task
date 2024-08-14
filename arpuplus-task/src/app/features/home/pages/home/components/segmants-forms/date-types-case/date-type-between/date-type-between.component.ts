import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from '../../../../../../../../shared/components/form/inputs/input-number/input-number.component';
import { InputSelectComponent } from '../../../../../../../../shared/components/form/inputs/input-select/input-select.component';
import { InputDatetimeComponent } from '../../../../../../../../shared/components/form/inputs/input-datetime/input-datetime.component';

@Component({
  selector: 'app-date-type-between',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberComponent, InputSelectComponent, InputDatetimeComponent],
  templateUrl: './date-type-between.component.html',
  styleUrl: './date-type-between.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTypeBetweenComponent {
  basicInfoGroup!: FormGroup; // Local property to hold the specific FormGroup
  @Input() groupName!: string; // Input to receive the group name

  @Input() indexOfArray!: number;

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
    this.basicInfoGroup = this.formGroupRoot?.control?.get(this.groupName) as FormGroup;

  }
  getFormGroupName(name: string): FormGroup {
    return this.basicInfoGroup?.get(name) as FormGroup;
  }

}