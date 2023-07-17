import { Injectable } from '@angular/core';
import { Call } from '../pages/calls';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { map } from 'rxjs';
import { DbconvertService } from './dbconvert.service';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  apiUrl = enviroment.config.apiUrl;

  constructor(private http: HttpClient, private dbConvert: DbconvertService) {}
  getCalls(id: number) {
    return this.http
      .get<any>(this.apiUrl + 'kisi/' + id + '/cagrilar')
      .pipe(map((calls) => this.dbConvert.convertCalls(calls)));
  }
  callRequest(call: Call) {
    return this.http
      .post<any>(this.apiUrl + 'cagri/', this.dbConvert.convertCallToDB(call))
      .pipe(map((call) => this.dbConvert.convertCall(call)));
  }
  callResponse(call: Call) {
    return this.http
      .put<any>(
        this.apiUrl + 'cagri/' + call.id + '/',
        this.dbConvert.convertCallToDB(call)
      )
      .pipe(map((call) => this.dbConvert.convertCall(call)));
  }
}
