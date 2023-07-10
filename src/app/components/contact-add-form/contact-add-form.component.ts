import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company, companies } from 'src/app/pages/companies';

@Component({
  selector: 'app-contact-add-form',
  templateUrl: './contact-add-form.component.html',
  styleUrls: ['./contact-add-form.component.scss'],
})
export class ContactAddFormComponent {
  personForm = new FormGroup({
    image: new FormControl(
      'https://material.angular.io/assets/img/examples/shiba2.jpg'
    ),
    name: new FormControl(''),
    phone: new FormControl(''),
  });
  personCompanies: Company[] = [
    { id: '2', image: 'asdf', name: 'Company 1', phoneNumber: '05' },
    { id: '1', image: 'asdf', name: 'Company 1', phoneNumber: '05' },
  ];

  add() {
    console.log(this.personForm.value);
    console.log(this.personCompanies);
  }
}
