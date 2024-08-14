import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, FormArray, ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from '../../../../../../../shared/components/form/inputs/input-number/input-number.component';
import { InputSelectComponent } from '../../../../../../../shared/components/form/inputs/input-select/input-select.component';

@Component({
  selector: 'app-data-type-number',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberComponent, InputSelectComponent],
  templateUrl: './data-type-number.component.html',
  styleUrl: './data-type-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTypeNumberComponent {
  basicInfoGroup!: FormGroup; // Local property to hold the specific FormGroup
  @Input() groupName!: string; // Input to receive the group name
  @Input() arrayName!: string;
  @Input() indexOfArray!: number;
  dropdownOptions: { label: string, value: number }[] = [
    { label: 'All case ', value: 1 },
    { label: 'Between Case', value: 2 },
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
}


