import { Injectable } from '@angular/core';
import { Person } from '../pages/persons';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}
  add(data: Person) {
    console.log(data);
    console.log('add contact');
  }
  edit(data: Person) {
    console.log(data);
    console.log('edit contact');
  }
  delete(data: Person) {
    console.log(data);
    console.log('delete contact');
  }
}
