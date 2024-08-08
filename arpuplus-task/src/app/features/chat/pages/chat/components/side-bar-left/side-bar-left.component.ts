import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-left',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar-left.component.html',
  styleUrl: './side-bar-left.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarLeftComponent  {
 
}
