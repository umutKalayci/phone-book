import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Call } from 'src/app/pages/calls';
import { Person } from 'src/app/pages/persons';
import { AuthService } from 'src/app/services/auth.service';
import { CallService } from 'src/app/services/call.service';

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
  call: Call | undefined = undefined;
  constructor(
    public dialogRef: MatDialogRef<CallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public person: Person,
    private callService: CallService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.startCall();
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.call);
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeCounter += 1000;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  startCall() {
    this.callService
      .callRequest({
        id: 0,
        callee: this.person.id,
        caller: this.auth.getAuth().id,
        date: new Date(),
        duration: 0,
        description: '',
        title: '',
      } as Call)
      .subscribe((data) => {
        this.call = data;
        setTimeout(() => {
          this.answered = true;
          if (!this.isCallEnd) this.startTimer();
        }, 4000);
      });
  }
  endCall() {
    if (this.call) {
      this.call.duration = this.timeCounter / 1000;
      this.callService.callResponse(this.call).subscribe((updatedData) => {
        this.call = updatedData;
        this.answered = true;
        this.isCallEnd = true;
        this.pauseTimer();
        this.dialogRef.disableClose = false;
      });
    }
  }
}
