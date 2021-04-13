import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'englishonly'
})
export class EnglishOnlyPipe implements PipeTransform {
  transform(value: any, ...args): any {
    return value.replace(/[^a-z-A-Z 0-9]/g, '');
  }
}
