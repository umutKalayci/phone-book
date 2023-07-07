import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Person, persons } from '../persons';
import { FormControl, FormGroup } from '@angular/forms';
import { Company, companies } from '../companies';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  itemIsSelected = false;
  persons: Person[] = persons;
  companies: Company[] = companies;
  _selectedPerson!: Person | null;
  get selectedPerson() {
    return this._selectedPerson;
  }
  set selectedPerson(value) {
    this._selectedPerson = value;
    this.personCompanies = [];
    this._selectedPerson?.companies?.forEach((selectedCompanyID) => {
      let company = companies.find((comp) => comp.id == selectedCompanyID);
      if (company) this.personCompanies?.push(company);
    });
  }

  personForm!: FormGroup | null;
  personCompanies!: Company[] | null;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let personID = params.get('id');
      if (personID) {
        let selectedPerson = persons.find((person) => person.id == personID);
        if (selectedPerson) {
          this.itemIsSelected = true;
          this.selectedPerson = selectedPerson;
          this.personForm = new FormGroup({
            image: new FormControl(selectedPerson?.image),
            name: new FormControl(selectedPerson?.name),
            phone: new FormControl(selectedPerson?.phoneNumber),
          });
        }
      }
    });
  }
  addPerson(event: any) {
    console.log('add');
    console.log(event);
  }
  savePerson() {
    console.log('save');
    console.log(this.personForm?.value);
  }
  deletePerson() {
    console.log('delete');
    console.log(this.selectedPerson);
  }

  addPersonCompany() {
    this.personCompanies?.push(companies[0]);
  }
  removeCompanyField(companyID: String) {
    console.log(companyID);
    this.personCompanies?.splice(
      this.personCompanies.findIndex((x) => x.id == companyID),
      1
    );
  }
}
