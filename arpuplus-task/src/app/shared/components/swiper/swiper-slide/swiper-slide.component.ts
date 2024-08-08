import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-swiper-slide',
  standalone: true,
  imports: [],
  templateUrl: './swiper-slide.component.html',
  styleUrls: ['./swiper-slide.component.scss'],
})
export class SwiperSlideComponent {
  @HostBinding() class = 'swiper-slide';
}
