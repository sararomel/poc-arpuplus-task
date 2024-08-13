import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasicInformatioSegmantsFormComponent } from "../basic-informatio-segmants-form/basic-informatio-segmants-form.component";
import { UsersSegmantsFormComponent } from "../users-segmants-form/users-segmants-form.component";
import { TechnologySegmantsFormComponent } from "../technology-segmants-form/technology-segmants-form.component";
import { UserAttributeSegmentsFormComponent } from '../user-attribute-segmants-form/user-attribute-segmants-form.component';

@Component({
  selector: 'app-segmants-form',
  standalone: true,
  imports: [BasicInformatioSegmantsFormComponent, ReactiveFormsModule, UsersSegmantsFormComponent, TechnologySegmantsFormComponent, UserAttributeSegmentsFormComponent],
  templateUrl: './segmants-form.component.html',
  styleUrl: './segmants-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmantsFormComponent implements OnInit {
  segmentsForm!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.initForm()
  }
  initForm(): void {
    this.segmentsForm = this.fb.group({
      basicInfo: this.fb.group({
        id: [null, []],
        Name: [null, [Validators.required]],
        ApplicationId: [null, [Validators.required]],
        IsDraft: [false, []],
      }),
      users: this.fb.group({
        VisitorTypeIds: [null, []],
      }),
      technology: this.fb.group({
        BrowserType: [null, []],
        DeviceType: [null, []],
      }),
      magicUserAttributes: this.fb.group({
        magicUserAttributes: this.fb.array([]) // Define the FormArray
      }),
    });
  }

  onSubmit() {
    if (this.segmentsForm.valid) {
      console.log('Form Submitted', this.segmentsForm.value);
    }
  }
}
