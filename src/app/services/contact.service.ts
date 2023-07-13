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

  getContact(id: number) {
    return this.http
      .get<any>(this.apiUrl + 'kisi/' + id)
      .pipe(map((person) => this.dbConvert.convertPersonDetail(person)));
  }
  add(data: Person) {
    return this.http
      .post<any>(this.apiUrl + 'kisi/', this.dbConvert.convertPersonToDB(data))
      .pipe(map((person) => this.dbConvert.convertPerson(person)));
  }
  edit(data: Person) {
    return this.http
      .put<any>(
        this.apiUrl + 'kisi/' + data.id + '/',
        this.dbConvert.convertPersonToDB(data)
      )
      .pipe(map((person) => this.dbConvert.convertPerson(person)));
  }
  delete(id: number) {
    return this.http.delete<any>(this.apiUrl + 'kisi/' + id);
  }
}
