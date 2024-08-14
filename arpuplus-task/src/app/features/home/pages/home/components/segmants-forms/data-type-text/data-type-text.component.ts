import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from "../../../../../../../shared/components/form/inputs/input-select/input-select.component";
import { InputTextComponent } from "../../../../../../../shared/components/form/inputs/input-text/input-text.component";

@Component({
  selector: 'app-data-type-text',
  standalone: true,
  imports: [InputSelectComponent, InputTextComponent, ReactiveFormsModule],
  templateUrl: './data-type-text.component.html',
  styleUrl: './data-type-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTypeTextComponent {
  basicInfoGroup!: FormGroup; // Local property to hold the specific FormGroup
  @Input() groupName!: string; // Input to receive the group name
  @Input() arrayName!: string;
  @Input() indexOfArray!: number;
  dropdownOptions: { label: string, value: number }[] = [
    { label: 'All case', value: 1 },
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

