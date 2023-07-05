import { Component } from '@angular/core';
import { Person, persons } from '../persons';
import { Company, companies } from '../companies';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent {
  companies: Company[] = companies;
  selectedCompany!: Company | null;
  companyForm!: FormGroup | null;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let companyID = params.get('id');
      if (companyID) {
        let selectedCompany = companies.find(
          (company) => company.id == companyID
        );
        if (selectedCompany) {
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
  saveCompany(company: Company) {
    console.log(company);
  }
  deleteCompany(companyID: String) {
    console.log(companyID);
  }
}
