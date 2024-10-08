import { HomeGetResponse, ProductGetResponse } from '../../../..';

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
} from '@angular/core';
import {
  TableModule,
  TablePageEvent,
  TableRowSelectEvent,
} from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { GetValueOfKeyPipe } from '../../../../../../shared/pipes/get-value-of-key.pipe';
import { IgnoreValuesPipe } from '../../../../../../shared/pipes/ignore-values.pipe';
import { RenameValuesPipe } from '../../../../../../shared/pipes/rename-value.pipe';
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'app-home-header',

  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeService]

})
export class HomeHeaderComponent  {
  data: any[] = [];

  constructor() {
    this.data = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
      { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '456-789-0123' },
      { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '321-654-9870' },
      { id: 5, name: 'David Wilson', email: 'david.wilson@example.com', phone: '654-321-0987' },
      { id: 6, name: 'Chris Brown', email: 'chris.brown@example.com', phone: '789-012-3456' },
      { id: 7, name: 'Anna Taylor', email: 'anna.taylor@example.com', phone: '012-345-6789' },
      { id: 8, name: 'James Anderson', email: 'james.anderson@example.com', phone: '098-765-4321' },
      { id: 9, name: 'Sarah Lee', email: 'sarah.lee@example.com', phone: '567-890-1234' },
      { id: 10, name: 'Robert Thomas', email: 'robert.thomas@example.com', phone: '890-123-4567' },
      { id: 11, name: 'Laura Moore', email: 'laura.moore@example.com', phone: '123-789-4560' },
      { id: 12, name: 'Andrew Jackson', email: 'andrew.jackson@example.com', phone: '456-123-7890' }
    ];
  }
}
