import { Component } from '@angular/core';
import { Person, persons } from '../persons';
import { Call, calls } from '../calls';
import { CallDialogComponent } from 'src/app/components/call-dialog/call-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(public dialog: MatDialog) {
    console.log(calls);
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
  }
  callPerson(person: Person) {
    console.log(person);
    const dialogRef = this.dialog.open(CallDialogComponent, {
      data: person,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
