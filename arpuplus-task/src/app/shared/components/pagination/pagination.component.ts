import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { HttpService } from '../../../core/services/http/http.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent extends BaseComponent implements OnInit {
  _apiUrl: string = 'portfolio/projects/';
  _params: Record<string, unknown> = {};
  count = 0;
  currentPage = 1;
  next: string | null = null;
  prev: string | null = null;

  @Input() set apiUrl(url) {
    this._apiUrl = url;
    this.emit();
  }

  @Input() set params(params: Record<string, unknown>) {
    this._params = params;
    this.currentPage = 1;
    this.emit();
  }

  @Input() itemsPerPage = 4;
  @Output() pageData = new EventEmitter<unknown>();

  get apiUrl() {
    return this._apiUrl;
  }

  get params() {
    return this._params;
  }

  get paginationNumbers() {
    return Array.from(
      { length: Math.ceil(this.count / this.itemsPerPage) },
      (_, i) => i + 1,
    );
  }

  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.emit();
  }

  emit() {
    Object.assign(this.params, { page: this.currentPage });
    const data$ = this.httpService
      .get(
        this.apiUrl,

        this.params,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.pageData.emit(res);
        this.count = (res as { count: number }).count;
        this.next = (res as { next: string | null }).next;
        this.prev = (res as { previous: string | null }).previous;
        this.cdr.markForCheck();
      });
  }

  numberClick(i: number) {
    Object.assign(this.params, { page: i });
    this.currentPage = i;
    this.emit();
  }

  onPrev() {
    this.currentPage = Math.max(this.currentPage - 1, 0);
    this.emit();
  }

  onNext() {
    this.currentPage = Math.min(
      this.currentPage + 1,
      Math.ceil(this.count / this.itemsPerPage),
    );
    this.emit();
  }
}
