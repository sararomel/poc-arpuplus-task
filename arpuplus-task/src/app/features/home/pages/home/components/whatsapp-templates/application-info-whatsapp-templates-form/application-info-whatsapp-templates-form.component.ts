import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from "../../../../../../../shared/components/form/inputs/input-text/input-text.component";
import { InputSelectComponent } from "../../../../../../../shared/components/form/inputs/input-select/input-select.component";
import { InputNumberComponent } from "../../../../../../../shared/components/form/inputs/input-number/input-number.component";

@Component({
  selector: 'app-application-info-whatsapp-templates-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextComponent, InputSelectComponent, InputNumberComponent],
  templateUrl: './application-info-whatsapp-templates-form.component.html',
  styleUrl: './application-info-whatsapp-templates-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationInfoWhatsappTemplatesFormComponent implements OnInit {
  basicsInfoGroup!: FormGroup;
  @Input() groupName!: string;
  dropdownOptions: { label: string, value: number }[] = [
    { label: 'application 1', value: 1 },
    { label: 'application 2', value: 2 },
    { label: 'application 3', value: 3 },
    { label: 'application 4', value: 4 },
  ]

  constructor(private formGroupRoot: FormGroupDirective) { }

  ngOnInit(): void {
    // Get the specific FormGroup from the root FormGroup using the name passed
    this.basicsInfoGroup = this.formGroupRoot?.control?.get(this.groupName) as FormGroup;
  }
}
