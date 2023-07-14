import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/pages/persons';
import { UploadWidgetConfig, UploadWidgetResult, Uploader } from 'uploader';

@Component({
  selector: 'app-contact-add-form',
  templateUrl: './contact-add-form.component.html',
  styleUrls: ['./contact-add-form.component.scss'],
})
export class ContactAddFormComponent {
  personForm = new FormGroup({
    image: new FormControl(''),
    isFileUpload: new FormControl(true),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });
  personCompanies: Number[] = [];

  uploader = Uploader({
    apiKey: 'free',
  });
  options: UploadWidgetConfig = {
    multi: false,
  };
  constructor(public dialogRef: MatDialogRef<ContactAddFormComponent>) {}

  onUploadComplete = (files: UploadWidgetResult[]) => {
    this.personForm.get('image')?.patchValue(files[0]?.fileUrl);
    this.personForm.get('image')?.disable();
  };
  add() {
    if (this.personForm.valid)
      this.dialogRef.close({
        ...{ id: 0 },
        ...{ companies: this.personCompanies },
        ...this.personForm.value,
      } as Person);
  }
}
