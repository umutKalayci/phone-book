import { Injectable } from '@angular/core';
import { Company } from '../pages/companies';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor() {}
  add(data: Company) {
    console.log(data);
    console.log('add Company');
  }
  edit(data: Company) {
    console.log(data);
    console.log('edit Company');
  }
  delete(data: Company) {
    console.log(data);
    console.log('delete Company');
  }
}
