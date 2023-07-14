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
    console.log(this.personForm.value.phoneNumber?.replace(/\s/g, ''));
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
  onPhoneFieldChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, ''); // Sadece sayıları tut
    let formattedValue = '';
    if (value.length > 10) value = value.slice(0, 9);
    if (value.length == 0)
      this.personForm.controls.phoneNumber.setErrors({ required: true });
    else {
      formattedValue =
        value.length > 3
          ? formattedValue +
            (value.slice(0, 3) +
              ' ' +
              (value.length > 6
                ? value.slice(3, 6) + ' ' + value.slice(6)
                : (formattedValue += value.slice(3))))
          : value;
      if (value.length < 10)
        this.personForm.controls.phoneNumber.setErrors({ pattern: true });
    }
    input.value = formattedValue;
  }
}
