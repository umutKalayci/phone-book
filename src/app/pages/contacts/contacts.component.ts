import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Person } from '../persons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddFormComponent } from 'src/app/components/contact-add-form/contact-add-form.component';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  persons: Person[] = [];
  selectedPerson: Person | null = null;
  personForm = new FormGroup({
    id: new FormControl(null as number | null),
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl('', [Validators.email]),
  });
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
          this.selectedPerson = this.persons.find(
            (person) => person.id == personID
          ) as Person | null;
          if (this.selectedPerson) {
            this.personForm?.setValue({
              id: this.selectedPerson.id,
              name: this.selectedPerson.name,
              phoneNumber: this.selectedPerson.phoneNumber,
              email: this.selectedPerson.email as string,
            });
            this.imageUrl = this.selectedPerson.image as string;
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
      ...{
        phoneNumber: this.personForm.value.phoneNumber?.replace(/\s/g, ''),
      },
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
          this.selectedPerson = null;
          this.personForm.reset();
        }
      });
    }
  }
  onPhoneFieldChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, ''); // Sadece sayıları tut
    let formattedValue = '';
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length == 0)
      this.personForm.controls.phoneNumber.setErrors({ required: true });
    else {
      formattedValue =
        value.length > 3
          ? formattedValue +
            (value.slice(0, 3) +
              ' ' +
              (value.length > 6
                ? value.slice(3, 6) + ' ' + value.slice(6)
                : (formattedValue += value.slice(3))))
          : value;
      if (value.length < 10)
        this.personForm.controls.phoneNumber.setErrors({ pattern: true });
    }
    input.value = formattedValue;
  }
}
