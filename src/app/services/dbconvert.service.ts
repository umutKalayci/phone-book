import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Company } from '../pages/companies';
import { Person } from '../pages/persons';

@Injectable({
  providedIn: 'root',
})
export class DbconvertService {
  constructor() {}

  convertCompanies(companies: []): Company[] {
    return companies.map((company: any) => this.convertCompany(company));
  }
  convertCompany(data: DbCompany): Company {
    return {
      id: data.sirket_id,
      name: data.sirket_isim,
      phoneNumber: data.sirket_tel,
      image: 'https://loremflickr.com/320/240/logo',
    };
  }
  convertCompanyToDB(data: Company) {
    console.log({
      // sirket_id: data.id,
      sirket_isim: data.name,
      sirket_tel: data.phoneNumber,
      // image: data.image,
    });
    return {
      // sirket_adres: 'data.address',
      // sirket_email: 'data.email@gmail.com',
      // sirket_id: 6,
      // sirket_web: 'http://data.web.com',
      sirket_isim: data.name,
      sirket_tel: data.phoneNumber,
      // image: data.image,
    };
  }
  convertPersons(persons: []): Person[] {
    return persons.map((person: any) => this.convertPerson(person));
  }
  convertPerson(data: DbPerson): Person {
    return {
      id: data.kisi_id,
      name: data.kisi_adsoyad,
      phoneNumber: data.kisi_tel,
      image: 'https://loremflickr.com/320/240/logo',
    };
  }
  convertPersonDetail(data: DbPerson): Person {
    return {
      ...this.convertPerson(data),
      ...{ companies: this.convertCompanies(data.sirketler) },
    };
  }
}

interface DbCompany {
  sirket_id: string;
  sirket_isim: string;
  sirket_tel: string;
}
interface DbPerson {
  kisi_id: string;
  kisi_adsoyad: string;
  kisi_tel: string;
  sirketler: [];
}
