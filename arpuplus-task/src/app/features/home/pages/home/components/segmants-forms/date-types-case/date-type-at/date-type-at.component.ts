import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputDatetimeComponent } from '../../../../../../../../shared/components/form/inputs/input-datetime/input-datetime.component';
import { InputSelectComponent } from '../../../../../../../../shared/components/form/inputs/input-select/input-select.component';

@Component({
  selector: 'app-date-type-at',
  standalone: true,
  imports: [ReactiveFormsModule, InputDatetimeComponent, InputSelectComponent],
  templateUrl: './date-type-at.component.html',
  styleUrl: './date-type-at.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTypeAtComponent {

  basicInfoGroup!: FormGroup; // Local property to hold the specific FormGroup
  @Input() groupName!: string; // Input to receive the group name
  @Input() arrayName!: string;
  @Input() indexOfArray!: number;

  dropdownOptionsDuration: { label: string, value: number }[] = [
    { label: 'Date ', value: 1 },
    { label: 'Month', value: 2 },
    { label: 'Week', value: 3 },
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