import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgComponent implements AfterViewInit {
  @Input() url!: string;
  @Input() ngStyle = {};
  @Input() overrideColor = true;
  @Input() overrideFill = true;
  @Input() overrideStroke = true;
  @Input() overrideSize = false;
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get(this.url, { responseType: 'text' }).subscribe((res) => {
      this.container.nativeElement.innerHTML = res;
      const children = this.container.nativeElement.querySelectorAll('*');
      if (this.overrideColor) {
        children.forEach((el) => {
          if (
            this.overrideFill &&
            el.getAttribute('fill') &&
            el.getAttribute('fill') !== 'none'
          ) {
            el.setAttribute('fill', 'currentColor');
          }
          if (
            this.overrideStroke &&
            el.getAttribute('stroke') &&
            el.getAttribute('stroke') !== 'none'
          ) {
            el.setAttribute('stroke', 'currentColor');
          }
        });
      }
      if (this.overrideSize) {
        if (children[0].getAttribute('width')) {
          children[0].setAttribute('width', '100%');
        }
        if (children[0].getAttribute('height')) {
          children[0].setAttribute('height', '100%');
        }
      }
    });
  }
}
