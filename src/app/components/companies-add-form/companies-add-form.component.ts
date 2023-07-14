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
    phoneNumber: new FormControl('', [Validators.required]),
  });
  imageUrl = '';
  constructor(public dialogRef: MatDialogRef<CompaniesAddFormComponent>) {}
  add() {
    if (this.companyForm.valid)
      this.dialogRef.close({
        ...{ id: 0 },
        ...{ image: this.imageUrl },
        ...this.companyForm.value,
      } as Company);
  }
}
