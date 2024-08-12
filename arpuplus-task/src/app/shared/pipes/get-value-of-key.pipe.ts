import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValueOfKey',
  standalone: true,
})
export class GetValueOfKeyPipe implements PipeTransform {
  transform(
    valueObj: any,
    key: string,
    keyVal: Record<string, string>,
  ): string {
    const keys = key.split('.');
    if (keys.length === 1) return valueObj[key];
    key = keys[0];
    const value = keyVal[key];
    if (!value) return valueObj[key];
    for (let k of value.split('.')) {
      if (Array.isArray(valueObj)) {
        if (valueObj.length === 0) return '';
        valueObj = valueObj.filter((v) => v.primaryflag)[0] || valueObj[0];
      }
      valueObj = valueObj[k];
    }
    return valueObj;
  }
}
