import { Injectable } from '@angular/core';
import { Company } from '../pages/companies';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { map } from 'rxjs';
import { DbconvertService } from './dbconvert.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiUrl = enviroment.config.apiUrl;

  constructor(private http: HttpClient, private dbConvert: DbconvertService) {}
  getCompanies() {
    return this.http
      .get<any>(this.apiUrl + 'sirket/')
      .pipe(map((companies) => this.dbConvert.convertCompanies(companies)));
  }
  getCompany(id: string) {
    return this.http
      .get<any>(this.apiUrl + 'sirket/' + id)
      .pipe(map((company) => this.dbConvert.convertCompany(company)));
  }
  add(data: Company) {
    console.log(data);
    console.log('add Company');
    return this.http
      .post<any>(
        this.apiUrl + 'sirket/',
        this.dbConvert.convertCompanyToDB(data)
      )
      .pipe(map((company) => this.dbConvert.convertCompany(company)));
  }
  edit(data: Company) {
    console.log(data);
    console.log('edit Company');
    return this.http
      .put<any>(
        this.apiUrl + 'sirket/' + data.id + '/',
        this.dbConvert.convertCompanyToDB(data)
      )
      .pipe(map((company) => this.dbConvert.convertCompany(company)));
  }
  delete(id: String) {
    console.log(id);
    console.log('delete Company');
    return this.http.delete<any>(this.apiUrl + 'sirket/' + id);
  }
}
