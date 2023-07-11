import { Injectable } from '@angular/core';
import { Person } from '../pages/persons';
import { AuthService } from './auth.service';
import { Call } from '../pages/calls';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  constructor(private auth: AuthService) {}
  callRequest(callee: Person) {
    let call: Call = {
      id: '222',
      callee: callee,
      caller: this.auth.getAuth(),
      date: new Date(),
      duration: 0,
    };
    console.log(call);
    return call;
  }
  callResponse(call: Call) {
    console.log(call);
  }
}
