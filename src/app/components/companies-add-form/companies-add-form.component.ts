import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/pages/companies';

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
}
