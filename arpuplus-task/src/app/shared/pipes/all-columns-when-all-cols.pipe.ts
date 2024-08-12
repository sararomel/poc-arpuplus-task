import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allColumnsWhenAllCols',
  standalone: true,
})
export class AllColumnsWhenAllColsPipe implements PipeTransform {
  transform(columns: string[], allColumns: string[]): string[] {
    for (let col of columns) {
      if (col === '*') {
        return allColumns;
      }
    }
    return columns;
  }
}
