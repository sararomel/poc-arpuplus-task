import { BidiModule } from '@angular/cdk/bidi';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorDirective } from '../form/form-error.directive';
import { MatFormFieldDirective } from '../form/form-field.directive';
import { MatFileInputComponent } from '../form/inputs/mat-file-input/mat-file-input.component';

export const formModules = [
  MatFormFieldModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatInputModule,
  BidiModule,
  FormErrorDirective,
  MatFormFieldDirective,
  MatFileInputComponent,
];
