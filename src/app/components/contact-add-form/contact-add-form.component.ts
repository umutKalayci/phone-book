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
    image: new FormControl(
      'https://material.angular.io/assets/img/examples/shiba2.jpg',
      [Validators.required]
    ),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });
  personCompanies: Company[] = [];

  constructor(public dialogRef: MatDialogRef<ContactAddFormComponent>) {}
  add() {
    if (this.personForm.valid)
      this.dialogRef.close({
        ...{ id: '' },
        ...{ companies: this.personCompanies },
        ...this.personForm.value,
      } as Person);
  }
}
