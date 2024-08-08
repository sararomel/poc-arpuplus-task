import {
  CommonModule,
  IMAGE_LOADER,
  ImageLoaderConfig,
  NgOptimizedImage,
} from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResponsiveImage } from './models/image.model';

@Component({
  selector: 'app-responsive-image',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './responsive-image.component.html',
  styleUrls: ['./responsive-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (config.width && config.width > 1200)
          return (config.loaderParams as ResponsiveImage)['lg'];
        return (config.loaderParams as ResponsiveImage)['sm'];
      },
    },
  ],
})
export class ResponsiveImageComponent {
  @Input() image!: ResponsiveImage;
  @Input() ngStyle: { [key: string]: string } = {};
  @Input() priority = false;
  @Input() fill = true;
  @Input() width: number | undefined = undefined;
  @Input() height: number | undefined = undefined;
  @Input() objectFit: 'cover' | 'contain' | 'fill' | 'none' = 'cover';
  @Input() objectPosition: 'bottom' | 'left' | 'top' | 'right' | 'center' =
    'center';

  get name() {
    return this.image.lg.split('/').at(-1)?.split('.').at(0);
  }
}
