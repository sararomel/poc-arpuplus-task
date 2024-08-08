import { Pipe, PipeTransform } from '@angular/core';
import { ResponsiveImage } from '../components/responsive-image/models/image.model';
import { isMobile } from '../utils/media-utils';

@Pipe({
  name: 'responsive',
  standalone: true,
})
export class ResponsivePipe implements PipeTransform {
  transform(value: ResponsiveImage): string {
    if (isMobile()) return value.sm;
    return value.lg;
  }
}
