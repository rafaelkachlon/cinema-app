import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uppercaseword'
})
export class UppercaseWordsPipe implements PipeTransform {
  transform(value: string, ...args): any {
    return value.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
