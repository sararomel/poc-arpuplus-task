import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'renameValues',
  standalone: true,
})
export class RenameValuesPipe implements PipeTransform {
  transform(value: string, beforAfter: Record<string, string>): string {
    return beforAfter[value] || value;
  }
}
