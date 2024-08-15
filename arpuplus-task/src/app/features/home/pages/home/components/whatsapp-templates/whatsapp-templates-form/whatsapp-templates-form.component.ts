import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationInfoWhatsappTemplatesFormComponent } from "../application-info-whatsapp-templates-form/application-info-whatsapp-templates-form.component";

@Component({
  selector: 'app-whatsapp-templates-form',
  standalone: true,
  imports: [ReactiveFormsModule, ApplicationInfoWhatsappTemplatesFormComponent],
  templateUrl: './whatsapp-templates-form.component.html',
  styleUrl: './whatsapp-templates-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatsappTemplatesFormComponent {
  whatsappTemplatesForm!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.initForm()
  }
  initForm(): void {
    this.whatsappTemplatesForm = this.fb.group({
      applicationInfo: this.fb.group({
        Id: [null, [Validators.required]],
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
        MediaTitel:[null,[]]
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
    if (this.whatsappTemplatesForm.valid) {
      console.log('Form Submitted', this.whatsappTemplatesForm.value);
    }
  }
}
