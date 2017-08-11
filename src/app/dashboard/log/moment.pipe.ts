import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'momentFromNow', pure: false})
export class MomentPipe implements PipeTransform {
  transform(value: string): string {
    return moment.utc(value).fromNow();
  }
}
