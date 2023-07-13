import { Injectable } from '@angular/core';
import { Company } from '../pages/companies';
import { Person } from '../pages/persons';
import { Call } from '../pages/calls';

@Injectable({
  providedIn: 'root',
})
export class DbconvertService {
  constructor() {}

  convertCompanies(companies: DbCompany[]): Company[] {
    return companies.map((company: DbCompany) =>
      this.convertCompany(company)
    ) as Company[];
  }
  convertCalls(calls: DbCall[]): Call[] {
    return calls.map((call: DbCall) => this.convertCall(call)) as Call[];
  }
  convertCall(data: DbCall): Call {
    return {
      id: data.cagri_id,
      callee:
        typeof data.aranan_kisi === 'number'
          ? (data.aranan_kisi as number)
          : this.convertPerson(data.aranan_kisi),
      caller:
        typeof data.arayan_kisi === 'number'
          ? (data.arayan_kisi as number)
          : this.convertPerson(data.arayan_kisi),
      date: new Date(data.tarih),
      duration: data.cagri_suresi,
      title: data.arama_nedeni,
      description: data.aciklama,
    } as Call;
  }
  convertCallToDB(call: Call): DbCall {
    return {
      cagri_id: call.id,
      aranan_kisi: call.callee,
      arayan_kisi: call.caller,
      arama_nedeni: call.title,
      aciklama: call.description,
      cagri_suresi: call.duration,
      tarih: call.date,
    } as DbCall;
  }
  convertCompany(data: DbCompany): Company {
    return {
      id: data.sirket_id,
      name: data.sirket_isim,
      phoneNumber: data.sirket_tel,
      image: data.sirket_profil_fotografi,
      address: data.sirket_adres,
      email: data.sirket_email,
      webAddress: data.sirket_web,
    } as Company;
  }
  convertPersonToDB(data: Person): DbPerson {
    return {
      kisi_id: data.id,
      kisi_adsoyad: data.name,
      kisi_tel: data.phoneNumber,
      kisi_email: data.email,
      // profil_fotografi: data.image,
      sirketler: data.companies,
    } as DbPerson;
  }
  convertCompanyToDB(data: Company): DbCompany {
    return {
      sirket_id: data.id,
      sirket_isim: data.name,
      sirket_tel: data.phoneNumber,
      sirket_adres: data.address,
      sirket_email: data.email,
      sirket_web: data.webAddress,
    } as DbCompany;
  }
  convertPersons(persons: DbPerson[]): Person[] {
    return persons.map((person: DbPerson) =>
      this.convertPerson(person)
    ) as Person[];
  }
  convertPerson(data: DbPerson): Person {
    return {
      id: data.kisi_id,
      name: data.kisi_adsoyad,
      phoneNumber: data.kisi_tel,
      image: data.profil_fotografi,
      email: data.kisi_email,
      companies: data.sirketler,
    } as Person;
  }
  convertPersonDetail(data: DbPerson): Person {
    return {
      ...this.convertPerson(data),
      ...{ companies: data.sirketler as Number[] },
    } as Person;
  }
}

interface DbCompany {
  sirket_id: number;
  sirket_isim: string;
  sirket_tel?: string | null;
  sirket_adres?: string | null;
  sirket_email?: string | null;
  sirket_web?: string | null;
  sirket_profil_fotografi?: string | null;
}
interface DbPerson {
  kisi_id: number;
  kisi_adsoyad: string;
  kisi_tel: string;
  kisi_email?: string | null;
  sirketler: Number[];
  profil_fotografi?: string | null;
}
interface DbCall {
  cagri_id: number;
  aranan_kisi: DbPerson | number;
  arayan_kisi: DbPerson | number;
  tarih: Date;
  cagri_suresi: number;
  arama_nedeni: string;
  aciklama: string;
}
