import { Component } from '@angular/core';
import { Person, persons } from '../persons';
import { Call, calls } from '../calls';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent {
  personID = '1';
  todayDate = new Date();
  yesterdayDate = new Date();
  persons: Person[] = persons;
  calls: Call[] = calls;
  constructor() {
    console.log(calls);
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
  }
}
