import { Component } from '@angular/core';
import { Person, persons } from '../persons';
import { Company, companies } from '../companies';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CompaniesAddFormComponent } from 'src/app/components/companies-add-form/companies-add-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent {
  itemIsSelected = false;
  companies: Company[] = companies;
  selectedCompany!: Company | null;
  companyForm!: FormGroup | null;
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let companyID = params.get('id');
      if (companyID) {
        let selectedCompany = companies.find(
          (company) => company.id == companyID
        );
        if (selectedCompany) {
          this.itemIsSelected = true;
          this.selectedCompany = selectedCompany;
          this.companyForm = new FormGroup({
            id: new FormControl(selectedCompany?.id),
            image: new FormControl(selectedCompany?.image),
            name: new FormControl(selectedCompany?.name),
            phone: new FormControl(selectedCompany?.phoneNumber),
          });
        }
      }
    });
  }
  addCompany() {
    console.log('add');
    const dialogRef = this.dialog.open(CompaniesAddFormComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  saveCompany() {
    console.log(this.selectedCompany);
  }
  deleteCompany() {
    console.log(this.selectedCompany);
  }
}
