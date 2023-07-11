import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Person } from 'src/app/pages/persons';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';
import { CallService } from 'src/app/services/call.service';

@Component({
  selector: 'app-call-button',
  templateUrl: './call-button.component.html',
  styleUrls: ['./call-button.component.scss'],
})
export class CallButtonComponent {
  @Input() callee!: Person;
  constructor(public dialog: MatDialog, private callService: CallService) {}
  callPerson() {
    const dialogRef = this.dialog.open(CallDialogComponent, {
      data: this.callService.callRequest(this.callee),
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((callRes) => {
      this.callService.callResponse(callRes);
    });
  }
}
