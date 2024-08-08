import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper-container',
  standalone: true,
  imports: [],
  templateUrl: './swiper-container.component.html',
  styleUrls: ['./swiper-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperContainerComponent implements AfterViewInit, OnDestroy {
  @Input() config!: SwiperOptions;

  @Output() init = new EventEmitter<Swiper>();
  @Output() slideNextTransitionStart = new EventEmitter<Swiper>();
  @Output() slideNextTransitionEnd = new EventEmitter<Swiper>();
  @Output() slidePrevTransitionStart = new EventEmitter<Swiper>();
  @Output() slidePrevTransitionEnd = new EventEmitter<Swiper>();
  @Output() activeIndex = new EventEmitter<number>();
  @Output() isFirstSlide = new EventEmitter<boolean>();
  @Output() isLastSlide = new EventEmitter<boolean>();
  @Output() slideChange = new EventEmitter<Swiper>();
  swiper!: Swiper;
  initialized = false;
  @HostBinding() class = 'swiper';
  defaultConfig: SwiperOptions = {
    on: {
      init: (swiper) => {
        this.init.emit(swiper);
      },
      slideNextTransitionStart: (swiper) => {
        this.slideNextTransitionStart.emit(swiper);
      },
      slideNextTransitionEnd: (swiper) => {
        this.slideNextTransitionEnd.emit(swiper);
      },
      slidePrevTransitionStart: (swiper) => {
        this.slidePrevTransitionStart.emit(swiper);
      },
      slidePrevTransitionEnd: (swiper) => {
        this.slidePrevTransitionEnd.emit(swiper);
      },
      activeIndexChange: (swiper) => {
        this.activeIndex.emit(swiper.activeIndex);
        // this.isFirstSlide.emit(swiper.activeIndex === 0);
        // this.isLastSlide.emit(swiper.activeIndex === swiper.slides.length - 1);
      },
      reachEnd: (swiper) => {
        this.isLastSlide.emit(true);
        this.isFirstSlide.emit(false);
      },
      reachBeginning: (swiper) => {
        this.isFirstSlide.emit(true);
        this.isLastSlide.emit(false);
      },
      slideChange: (swiper) => {
        this.slideChange.emit(swiper);
      },
    },
  };

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.destroy();
  }

  initialize() {
    const finalConfig = Object.assign(this.defaultConfig, this.config);
    this.ngZone.runOutsideAngular(() => {
      this.swiper = new Swiper(this.elementRef.nativeElement, finalConfig);
    });
    this.initialized = true;
    return this.swiper;
  }

  destroy() {
    this.ngZone.runOutsideAngular(() => {
      this.swiper.destroy(true);
    });
    this.initialized = false;
  }
}
