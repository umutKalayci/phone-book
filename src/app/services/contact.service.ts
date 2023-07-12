import { Injectable } from '@angular/core';
import { Person } from '../pages/persons';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/enviroment';
import { map } from 'rxjs';
import { DbconvertService } from './dbconvert.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = enviroment.config.apiUrl;
  constructor(private http: HttpClient, private dbConvert: DbconvertService) {}
  getContacts() {
    return this.http
      .get<any>(this.apiUrl + 'kisi/')
      .pipe(map((persons) => this.dbConvert.convertPersons(persons)));
  }

  getContact(id: string) {
    return this.http
      .get<any>(this.apiUrl + 'kisi/' + id)
      .pipe(map((person) => this.dbConvert.convertPersonDetail(person)));
  }
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
