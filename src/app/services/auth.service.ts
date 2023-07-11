import { Injectable } from '@angular/core';
import { Person, persons } from '../pages/persons';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private person: Person;
  isLoggedIn: boolean = false;
  constructor() {
    this.person = persons[0];
    this.isLoggedIn = true;
  }
  getAuth() {
    return this.person;
  }
}
