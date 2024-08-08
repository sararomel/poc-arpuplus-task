import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink, RouterModule],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChattHeaderComponent implements OnInit {
  isSearchable: boolean = false;
  currentRoute: string;
  onSearch(): void {
    this.isSearchable = true;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.currentRoute = '';
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }
}
