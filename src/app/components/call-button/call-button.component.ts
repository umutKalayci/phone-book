import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Person } from 'src/app/pages/persons';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';

@Component({
  selector: 'app-call-button',
  templateUrl: './call-button.component.html',
  styleUrls: ['./call-button.component.scss'],
})
export class CallButtonComponent {
  @Input() calle!: Person;
  constructor(public dialog: MatDialog) {}
  callPerson() {
    console.log(this.calle);
    const dialogRef = this.dialog.open(CallDialogComponent, {
      data: this.calle,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
