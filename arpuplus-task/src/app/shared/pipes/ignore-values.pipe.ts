import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ignoreValues',
  standalone: true,
})
export class IgnoreValuesPipe implements PipeTransform {
  transform(values: string[], ...ignoredValues: string[]) {
    return values.filter((value) => !ignoredValues.includes(value));
  }
}
