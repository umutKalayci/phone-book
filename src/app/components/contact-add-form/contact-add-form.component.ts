import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/pages/companies';
import { Person } from 'src/app/pages/persons';

@Component({
  selector: 'app-contact-add-form',
  templateUrl: './contact-add-form.component.html',
  styleUrls: ['./contact-add-form.component.scss'],
})
export class ContactAddFormComponent {
  personForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });
  personCompanies: Number[] = [];

  constructor(public dialogRef: MatDialogRef<ContactAddFormComponent>) {}
  add() {
    if (this.personForm.valid)
      this.dialogRef.close({
        ...{ id: 0 },
        ...{ companies: this.personCompanies },
        ...this.personForm.value,
      } as Person);
  }
}
