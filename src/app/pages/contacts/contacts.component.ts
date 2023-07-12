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
  persons: Person[] = [];
  selectedPerson: Person | null = null;
  personForm!: FormGroup;
  personCompanies: Company[] = [];
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private contactService: ContactService
  ) {}
  ngOnInit() {
    this.contactService.getContacts().subscribe((persons) => {
      this.persons = persons;
      this.route.paramMap.subscribe((params: ParamMap) => {
        let personID = params.get('id');
        if (personID) {
          this.contactService
            .getContact(personID)
            .subscribe((person: Person) => {
              if (person) {
                this.itemIsSelected = true;
                this.personForm = new FormGroup({
                  id: new FormControl(person.id),
                  image: new FormControl(person.image),
                  name: new FormControl(person.name),
                  phoneNumber: new FormControl(person.phoneNumber),
                });
                this.selectedPerson = person;
              }
            });
        }
      });
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
