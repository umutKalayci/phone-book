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
  calls: Call[] = calls;
  groupedCalls: {
    date: Date;
    calls: [
      {
        duration: number;
        isCaller: Boolean;
        date: Date;
        person: Person;
      }
    ];
  }[];
  constructor() {
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);

    const groups = calls.reduce((groups: any, call) => {
      const date = call.date.toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push({
        isCaller: !(call.caller.id == this.personID),
        person: call.caller.id == this.personID ? call.callee : call.caller,
        date: call.date,
        duration: call.duration,
      });
      return groups;
    }, {});
    this.groupedCalls = Object.keys(groups).map((date) => {
      return {
        date: new Date(date),
        calls: groups[date],
      };
    });
  }
}
