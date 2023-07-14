import { Component } from '@angular/core';
import { Company } from '../companies';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CompaniesAddFormComponent } from 'src/app/components/companies-add-form/companies-add-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent {
  companies: Company[] = [];
  selectedCompany: Company | null = null;
  companyForm: FormGroup = new FormGroup({
    id: new FormControl(null as number | null),
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    webAddress: new FormControl(''),
  });
  imageUrl = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private companyService: CompanyService
  ) {}
  ngOnInit() {
    this.companyService.getCompanies().subscribe((companies: Company[]) => {
      this.companies = companies;
      this.route.paramMap.subscribe((params: ParamMap) => {
        const companyID = Number(params.get('id'));
        if (companyID) {
          this.selectedCompany = this.companies.find(
            (c) => c.id == companyID
          ) as Company;
          if (this.selectedCompany) {
            const { image: _, ...companyFormValues } = this.selectedCompany;
            this.companyForm.setValue(companyFormValues);
            this.imageUrl = this.selectedCompany.image as string;
          } else this.router.navigateByUrl('/companies');
        }
      });
    });
  }
  addCompany() {
    const dialogRef = this.dialog.open(CompaniesAddFormComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((dialogData) => {
      if (dialogData) {
        this.companyService.add(dialogData).subscribe((company) => {
          this.companies.push(company);
        });
      }
    });
  }

  editCompany() {
    let company = {
      ...this.companyForm?.value,
      ...{ image: this.imageUrl },
      ...{
        phoneNumber: this.companyForm?.value.phoneNumber
          ?.replace(/\s/g, '')
          .slice(0, 10),
      },
    } as Company;
    this.companyService.edit(company).subscribe((data) => {
      this.companies[
        this.companies.findIndex((comp) => comp.id == company.id)
      ] = company;
    });
  }
  deleteCompany(company: Company, event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (confirm('Are you sure to delete ' + company.name)) {
      this.companyService.delete(company.id).subscribe((data) => {
        this.companies.splice(
          this.companies.findIndex((comp) => comp.id == company.id),
          1
        );
        if (this.selectedCompany?.id == company.id) {
          this.selectedCompany = null;
          this.companyForm.reset();
          this.router.navigateByUrl('companies');
        }
      });
    }
  }
}
