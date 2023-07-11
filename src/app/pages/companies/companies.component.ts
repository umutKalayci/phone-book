import { Component } from '@angular/core';
import { Company, companies } from '../companies';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CompaniesAddFormComponent } from 'src/app/components/companies-add-form/companies-add-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';

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
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private companyService: CompanyService
  ) {
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
    const dialogRef = this.dialog.open(CompaniesAddFormComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.companyService.add(result);
    });
  }

  saveCompany() {
    this.companyService.edit({
      ...this.companyForm?.value,
    } as Company);
  }
  deleteCompany(company: Company) {
    this.companyService.delete(company);
  }
}
