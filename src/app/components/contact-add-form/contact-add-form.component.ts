import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/pages/persons';

@Component({
  selector: 'app-contact-add-form',
  templateUrl: './contact-add-form.component.html',
  styleUrls: ['./contact-add-form.component.scss'],
})
export class ContactAddFormComponent {
  personForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
  });
  imageUrl = '';
  personCompanies: Number[] = [];
  constructor(public dialogRef: MatDialogRef<ContactAddFormComponent>) {}

  add() {
    if (this.personForm.valid)
      this.dialogRef.close({
        ...{ id: 0 },
        ...{ companies: this.personCompanies },
        ...{ image: this.imageUrl },
        ...this.personForm.value,
        ...{
          phoneNumber: this.personForm.value.phoneNumber
            ?.replace(/\s/g, '')
            .slice(0, 10),
        },
      } as Person);
  }
}
