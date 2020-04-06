import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'targetEntityToName'
})
export class TargetEntityToNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('value--------------', value);
    console.log('args--------------', args);
    return 'sadadsads';
  }

}
