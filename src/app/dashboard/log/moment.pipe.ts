import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'momentFromNow', pure: false})
export class MomentPipe implements PipeTransform {
  transform(value: string): string {

    // console.log('today is', moment());
    // console.log('parsed is', moment.utc('2017-07-26T20:09:21.94').fromNow());

    return moment.utc(value).fromNow();

  }
}
