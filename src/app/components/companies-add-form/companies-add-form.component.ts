import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/pages/companies';
import { ContactAddFormComponent } from '../contact-add-form/contact-add-form.component';

@Component({
  selector: 'app-companies-add-form',
  templateUrl: './companies-add-form.component.html',
  styleUrls: ['./companies-add-form.component.scss'],
})
export class CompaniesAddFormComponent {
  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    webAddress: new FormControl(''),
  });
  imageUrl = '';
  constructor(public dialogRef: MatDialogRef<CompaniesAddFormComponent>) {}
  add() {
    if (this.companyForm.valid)
      this.dialogRef.close({
        ...{ id: 0 },
        ...{ image: this.imageUrl },
        ...this.companyForm.value,
        ...{
          phoneNumber: this.companyForm.value.phoneNumber
            ?.replace(/\s/g, '')
            .slice(0, 10),
        },
      } as Company);
  }

  onPhoneFieldChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, ''); // Sadece sayıları tut
    let formattedValue = '';
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length == 0)
      this.companyForm.controls.phoneNumber.setErrors(null);
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
        this.companyForm.controls.phoneNumber.setErrors({ pattern: true });
    }

    input.value = formattedValue;
    console.log(input.value);
  }
}
