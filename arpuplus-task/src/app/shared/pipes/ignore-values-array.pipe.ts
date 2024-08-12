import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ignoreValuesArray',
  standalone: true,
})
export class IgnoreValuesForArrayPipe implements PipeTransform {
    transform(values: string[], ignoredValues: string[]): string[] {
        return values.filter((value) => !ignoredValues.includes(value));
      }
  }
