import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from "../../../../../../../shared/components/form/inputs/input-select/input-select.component";

@Component({
  selector: 'app-users-segmants-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputSelectComponent],
  templateUrl: './users-segmants-form.component.html',
  styleUrl: './users-segmants-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSegmantsFormComponent {
  userFormGroup!: FormGroup; // Local property to hold the specific FormGroup
  @Input() groupName!: string; // Input to receive the group name
  dropdownOptions: { label: string, value: number }[] = [
    { label: 'user 1', value: 1 },
    { label: 'user 2', value: 2 },
    { label: 'user 3', value: 3 },
    { label: 'user 4', value: 4 },
  ]

  constructor(private formGroupRoot: FormGroupDirective) { }

  ngOnInit(): void {
    // Get the specific FormGroup from the root FormGroup using the name passed
    this.userFormGroup = this.formGroupRoot?.control?.get(this.groupName) as FormGroup;
  }
  
}

