import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/pages/persons';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss'],
})
export class CallDialogComponent {
  timeCounter: number = 0;
  interval: any;
  answered = false;
  isCallEnd = false;
  constructor(
    public dialogRef: MatDialogRef<CallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {}
  ngOnInit() {
    setTimeout(() => {
      this.answered = true;
      this.startTimer();
      setTimeout(() => {
        this.endCall();
      }, 4000);
    }, 4000);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeCounter += 1000;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  endCall(): void {
    this.answered = true;
    this.isCallEnd = true;
    this.pauseTimer();
    setTimeout(() => {
      this.dialogRef.close();
    }, 4000);
  }
}
