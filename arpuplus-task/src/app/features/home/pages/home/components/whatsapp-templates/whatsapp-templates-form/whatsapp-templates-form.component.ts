import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationInfoWhatsappTemplatesFormComponent } from "../application-info-whatsapp-templates-form/application-info-whatsapp-templates-form.component";
import { ButtonComponent } from "../../../../../../../shared/components/button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-templates-form',
  standalone: true,
  imports: [ReactiveFormsModule, ApplicationInfoWhatsappTemplatesFormComponent, ButtonComponent, CommonModule],
  templateUrl: './whatsapp-templates-form.component.html',
  styleUrl: './whatsapp-templates-form.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatsappTemplatesFormComponent {
  whatsappTemplatesForm!: FormGroup;
  constructor(private fb: FormBuilder , private cd:ChangeDetectorRef) { }
  ngOnInit(): void {
    this.initForm()
  }
  initForm(): void {
    this.whatsappTemplatesForm = this.fb.group({
      applicationInfo: this.fb.group({
        Id: [null, []],
        Name: [null, [Validators.required]],
        ApplicationId: [null, [Validators.required]],
        WSPPId: [null, []],
        Sender: [null, []],
        LanguageType: [null, []],
        Description: [null, []],
      }),
      templates: this.fb.group({
        TemplateType: [null, []],
      }),
      Uploader: this.fb.group({
        FileUploadDocument: [null, []],
        FileUpload: [null, []],
        FileUploadVideo: [null, []],
        MediaTitel: [null, []]
      }),
      templatesEditor: this.fb.group({
        EmailTemplateText: [null, []],
      }),
      ButtonsVal: this.fb.group({
        ButtonsVal: this.fb.array([]) // Define the FormArray
      }),
    });
  }

  onSubmit() {
    console.log('Form Submission Attempted');
    this.whatsappTemplatesForm.markAllAsTouched();

    // Debugging: Check which controls are touched
    console.log('Is Name touched:', this.whatsappTemplatesForm.get('applicationInfo.Name')?.touched);

    if (this.whatsappTemplatesForm.valid) {
      console.log('Form Submitted Successfully', this.whatsappTemplatesForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
