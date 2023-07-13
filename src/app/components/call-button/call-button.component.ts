import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Person } from 'src/app/pages/persons';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';
import { Call } from 'src/app/pages/calls';

@Component({
  selector: 'app-call-button',
  templateUrl: './call-button.component.html',
  styleUrls: ['./call-button.component.scss'],
})
export class CallButtonComponent {
  @Input() callee!: Person;
  @Output() onCallAdded: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {}
  callPerson() {
    const dialogRef = this.dialog.open(CallDialogComponent, {
      data: this.callee,
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe((data: Call) => {
      let rdata: Call = data;
      rdata.callee = this.callee;
      this.onCallAdded.emit(rdata);
    });
  }
}
