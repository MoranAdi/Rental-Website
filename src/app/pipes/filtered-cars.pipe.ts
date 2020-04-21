import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilteredCarsPipe implements PipeTransform {

  transform(value: any[], search: string): any[] {
    if (!value) 'All';
    if (!search)
      return value;
    return value.filter(x => {
      return JSON.stringify(x).toLowerCase().includes(search.toLowerCase());
    });
  }
}
