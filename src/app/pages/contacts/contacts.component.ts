import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Person } from '../persons';
import { FormControl, FormGroup } from '@angular/forms';
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
  personForm: FormGroup | null = null;
  imageUrl = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private contactService: ContactService
  ) {}
  ngOnInit() {
    this.contactService.getContacts().subscribe((persons) => {
      this.persons = persons;
      this.route.paramMap.subscribe((params: ParamMap) => {
        let personID = Number(params.get('id'));
        if (personID) {
          let person = this.persons.find((person) => person.id == personID);
          if (person) {
            this.itemIsSelected = true;
            this.personForm = new FormGroup({
              id: new FormControl(person.id),
              name: new FormControl(person.name),
              phoneNumber: new FormControl(person.phoneNumber),
              email: new FormControl(person.email),
            });
            this.imageUrl = person.image as string;
            this.selectedPerson = person;
          } else this.router.navigateByUrl('contacts');
        }
      });
    });
  }
  addPersonDialog() {
    const dialogRef = this.dialog.open(ContactAddFormComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.contactService.add(result).subscribe((data: Person) => {
          this.persons.push(data);
        });
    });
  }
  savePerson() {
    let person = {
      ...{ companies: this.selectedPerson?.companies },
      ...this.personForm?.value,
      ...{ image: this.imageUrl },
    } as Person;
    this.contactService.edit(person).subscribe((data: Person) => {
      this.persons[this.persons.findIndex((p) => p.id == person.id)] = data;
    });
  }
  deletePerson(person: Person) {
    if (confirm('Are you sure to delete ' + person.name)) {
      this.contactService.delete(person.id).subscribe(() => {
        this.persons.splice(
          this.persons.findIndex((p) => p.id == person.id),
          1
        );
        if (this.selectedPerson?.id == person.id) {
          this.selectedPerson = this.personForm = null;
          this.itemIsSelected = false;
        }
      });
    }
  }
}
