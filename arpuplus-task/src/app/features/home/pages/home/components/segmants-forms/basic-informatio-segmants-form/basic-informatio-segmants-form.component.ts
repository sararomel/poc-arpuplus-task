import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputCheckboxComponent } from "../../../../../../../shared/components/form/inputs/input-checkbox/input-checkbox.component";
import { InputSelectComponent } from "../../../../../../../shared/components/form/inputs/input-select/input-select.component";
import { InputTextComponent } from "../../../../../../../shared/components/form/inputs/input-text/input-text.component";

@Component({
  selector: 'app-basic-informatio-segmants-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputCheckboxComponent, InputSelectComponent, InputTextComponent],
  templateUrl: './basic-informatio-segmants-form.component.html',
  styleUrl: './basic-informatio-segmants-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [FormGroupDirective]
})
export class BasicInformatioSegmantsFormComponent implements OnInit {
  basicInfoGroup!: FormGroup; // Local property to hold the specific FormGroup
  @Input() groupName!: string; // Input to receive the group name
  dropdownOptions: { label: string, value: number }[] = [
    { label: 'application 1', value: 1 },
    { label: 'application 2', value: 2 },
    { label: 'application 3', value: 3 },
    { label: 'application 4', value: 4 },
  ]

  constructor(private formGroupRoot: FormGroupDirective) { }

  ngOnInit(): void {
    // Get the specific FormGroup from the root FormGroup using the name passed
    this.basicInfoGroup = this.formGroupRoot?.control?.get(this.groupName) as FormGroup;
  }
  
}
