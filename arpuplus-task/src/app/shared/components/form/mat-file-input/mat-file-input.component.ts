import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormGroupDirective,
  NgControl,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';

class FileInput {
  constructor(public file: File) {}
}
@Component({
  selector: 'app-mat-file-input',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './mat-file-input.component.html',
  styleUrl: './mat-file-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: MatFileInputComponent },
  ],
})
export class MatFileInputComponent
  implements MatFormFieldControl<FileInput>, ControlValueAccessor, OnInit
{
  stateChanges = new Subject<void>();
  resumeFile!: File;
  fileForm!: FormGroup;
  // fileForm = new FormGroup({ file: new FormControl() });
  onChange: any = () => {};
  onTouched: any = () => {};
  id = `file-input-${MatFileInputComponent.nextId++}`;
  autofilled?: boolean | undefined;
  static nextId = 0;
  focused = false;
  _elementRef = inject(ElementRef);
  touched = false;

  @Input() formControlName = 'file';
  @Output() file = new EventEmitter<File>();
  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective,
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnInit(): void {
    this.fileForm = this._parentFormGroup.form;
  }
  writeValue(obj: any): void {
    this.resumeFile = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
  handleFileInput(files: FileList) {
    this.resumeFile = files.item(0) as File;
    this.file.emit(this.resumeFile);
  }
  get value() {
    return new FileInput(this.resumeFile);
  }
  set value(value: FileInput) {
    this.resumeFile = value.file;
    this.onChange(value.file);
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder = '';

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.stateChanges.next();
    }
  }

  get empty() {
    return !this.fileForm.value.file;
  }
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    // return this.focused || !this.empty;
    return false;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  get errorState(): boolean {
    return this.fileForm.invalid && this.touched;
  }
  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  private updateErrorState() {
    const parent = this._parentFormGroup || this._parentForm;

    const oldState = this.errorState;
    const newState =
      (this.ngControl?.invalid || this.fileForm.invalid) &&
      (this.touched || parent.submitted);

    if (oldState !== newState) {
      this.stateChanges.next();
    }
  }
  controlType = 'file-input';
  @Input('aria-describedby') userAriaDescribedBy!: string;
  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-tel-input-container',
    )!;
    controlElement?.setAttribute('aria-describedby', ids.join(' '));
  }
  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }
}
