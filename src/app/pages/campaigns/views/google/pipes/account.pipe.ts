import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'account'})
export class AccountPipe implements PipeTransform {
  transform(value: string): string {

    const account = value.split(':')[1]

    return `${account.substring(0,3)}-${account.substring(3,6)}-${account.substring(6,10)}`
  }
}