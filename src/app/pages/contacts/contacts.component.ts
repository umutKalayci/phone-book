import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Person, persons } from '../persons';
import { FormControl, FormGroup } from '@angular/forms';
import { Company, companies } from '../companies';
import { MatDialog } from '@angular/material/dialog';
import { CallDialogComponent } from 'src/app/components/call-dialog/call-dialog.component';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
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
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let personID = params.get('id');
      if (personID) {
        let selectedPerson = persons.find((person) => person.id == personID);
        if (selectedPerson) {
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
  savePerson() {
    console.log(this.personForm?.value);
  }
  deletePerson() {
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
  callPerson(person: Person) {
    console.log(person);
    const dialogRef = this.dialog.open(CallDialogComponent, {
      data: person,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
