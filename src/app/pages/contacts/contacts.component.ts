import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Person, persons } from '../persons';
import { FormControl, FormGroup } from '@angular/forms';
import { Company, companies } from '../companies';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddFormComponent } from 'src/app/components/contact-add-form/contact-add-form.component';
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
  personCompanies: Company[] = [];
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}
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
  addPerson() {
    console.log('add');
    const dialogRef = this.dialog.open(ContactAddFormComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  savePerson() {
    console.log('save');
    console.log(this.personForm?.value);
    console.log(this.personCompanies);
  }
  deletePerson() {
    console.log('delete');
    console.log(this.selectedPerson);
  }
}
