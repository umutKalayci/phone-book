import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    image: new FormControl(
      'https://material.angular.io/assets/img/examples/shiba2.jpg'
    ),
    name: new FormControl(),
    phone: new FormControl(),
  });

  constructor(public dialogRef: MatDialogRef<CompaniesAddFormComponent>) {}
  add() {
    console.log(this.companyForm.value);
    this.dialogRef.close();
  }
}
