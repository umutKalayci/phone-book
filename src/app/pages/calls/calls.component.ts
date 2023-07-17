import { Component } from '@angular/core';
import { Person } from '../persons';
import { Call, calls } from '../calls';
import { CallService } from 'src/app/services/call.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent {
  todayDate = new Date();
  yesterdayDate = new Date();
  calls: Call[] = calls;
  groupedCalls: {
    date: Date;
    calls: [
      {
        duration: string;
        isCaller: Boolean;
        date: Date;
        person: Person;
        title: string;
        description: string;
      }
    ];
  }[] = [];
  constructor(private callService: CallService, private auth: AuthService) {
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
    callService.getCalls(this.auth.getAuth().id).subscribe((data) => {
      const groups = data.reduce((groups: any, call: Call) => {
        const date = call.date.toDateString();
        if (!groups[date]) groups[date] = [];
        groups[date].push({
          isCaller: !(typeof call.caller === 'number'),
          person: typeof call.caller === 'number' ? call.callee : call.caller,
          date: call.date,
          duration: call.duration as string,
          title: call.title,
          description: call.description,
        });
        return groups;
      }, {});
      this.groupedCalls = Object.keys(groups).map((date) => {
        return {
          date: new Date(date),
          calls: groups[date],
        };
      });
      this.sortGroupedCalls();
    });
  }
  sortGroupedCalls() {
    const currentDate = new Date().getTime();
    this.groupedCalls.sort((a, b) => this.sort(currentDate, a, b));
    this.groupedCalls.forEach((group) => {
      group.calls.sort((a, b) => this.sort(currentDate, a, b));
    });
  }
  sort(currentDate: number, a: any, b: any) {
    const diffA = Math.abs(currentDate - a.date.getTime());
    const diffB = Math.abs(currentDate - b.date.getTime());
    return diffA < diffB ? -1 : diffA > diffB ? 1 : 0;
  }
  stringToSeconds(duration: string) {
    const timeComponents = duration.split(':');
    const hour = parseInt(timeComponents[0], 10);
    const minute = parseInt(timeComponents[1], 10);
    const second = parseInt(timeComponents[2], 10);
    return hour * 3600 + minute * 60 + second;
  }
  addCallOnList(call: Call) {
    const date = call.date.toDateString();
    let newCall = {
      isCaller: !(typeof call.caller === 'number'),
      person: call.callee as Person,
      date: call.date,
      duration: call.duration as string,
      title: call.title as string,
      description: call.description as string,
    };
    if (this.groupedCalls[0].date.toDateString() === date) {
      this.groupedCalls[0].calls.unshift(newCall);
    } else
      this.groupedCalls.unshift({
        date: new Date(date),
        calls: [newCall],
      });
  }
}
