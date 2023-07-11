import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Person, persons } from '../persons';
import { FormControl, FormGroup } from '@angular/forms';
import { Company, companies } from '../companies';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddFormComponent } from 'src/app/components/contact-add-form/contact-add-form.component';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  itemIsSelected = false;
  persons: Person[] = persons;
  companies: Company[] = companies;
  selectedPerson: Person | null = null;
  personForm!: FormGroup | null;
  personCompanies: Company[] = [];
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private contactService: ContactService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let personID = params.get('id');
      if (personID) {
        let selectedPerson = persons.find((person) => person.id == personID);
        if (selectedPerson) {
          this.itemIsSelected = true;
          this.selectedPerson = selectedPerson;
          this.personForm = new FormGroup({
            id: new FormControl(selectedPerson?.id),
            image: new FormControl(selectedPerson?.image),
            name: new FormControl(selectedPerson?.name),
            phone: new FormControl(selectedPerson?.phoneNumber),
          });
        }
      }
    });
  }
  addPersonDialog() {
    const dialogRef = this.dialog.open(ContactAddFormComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.contactService.add(result);
    });
  }
  savePerson() {
    this.contactService.edit({
      ...{ companies: this.personCompanies },
      ...this.personForm?.value,
    } as Person);
  }
  deletePerson(person: Person) {
    this.contactService.delete(person);
  }
}
