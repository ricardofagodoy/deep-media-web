import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'account'})
export class AccountPipe implements PipeTransform {
  transform(value: string): string {
    return `${value.substring(0,3)}-${value.substring(3,6)}-${value.substring(6,10)}`
  }
}