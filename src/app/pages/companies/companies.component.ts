import { Component } from '@angular/core';
import { Company } from '../companies';
import { FormGroup, FormControl } from '@angular/forms';
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
  itemIsSelected = false;
  companies: Company[] = [];
  selectedCompany: Company | null = null;
  companyForm: FormGroup | null = null;
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
        let companyID = Number(params.get('id'));
        if (companyID) {
          this.companyService.getCompany(companyID).subscribe({
            next: (company: Company) => {
              this.itemIsSelected = true;
              this.selectedCompany = company;
              this.companyForm = new FormGroup({
                id: new FormControl(company.id),
                name: new FormControl(company.name),
                phoneNumber: new FormControl(company.phoneNumber),
                address: new FormControl(company.address),
                email: new FormControl(company.email),
                webAddress: new FormControl(company.webAddress),
              });
              this.imageUrl = company.image as string;
            },
            error: (err) => {
              this.router.navigateByUrl('/companies');
            },
          });
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
          this.selectedCompany = this.companyForm = null;
          this.itemIsSelected = false;
        }
      });
    }
  }
}
