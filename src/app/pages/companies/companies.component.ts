import { Component } from '@angular/core';
import { Company } from '../companies';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CompaniesAddFormComponent } from 'src/app/components/companies-add-form/companies-add-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent {
  companies: Company[] = [];
  selectedCompany: Company | null = null;
  companyForm = new FormGroup({
    id: new FormControl(null as number | null),
    name: new FormControl(''),
    phoneNumber: new FormControl('' as string | null | undefined),
    address: new FormControl('' as string | null | undefined),
    email: new FormControl('' as string | null | undefined, [Validators.email]),
    webAddress: new FormControl('' as string | null | undefined),
  });
  imageUrl = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private companyService: CompanyService,
    private _snackBar: MatSnackBar
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
            this.companyForm.setValue({
              id: this.selectedCompany.id,
              name: this.selectedCompany.name,
              phoneNumber: this.selectedCompany.phoneNumber,
              address: this.selectedCompany.address,
              email: this.selectedCompany.email,
              webAddress: this.selectedCompany.webAddress,
            });
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
          this._snackBar.open('Company successfully added.', 'Close', {
            duration: 4000,
          });
        });
      }
    });
  }

  editCompany() {
    if (this.companyForm.valid) {
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
        this._snackBar.open('Company successfully edited.', 'Close', {
          duration: 4000,
        });
      });
    }
  }
  deleteCompany(company: Company, event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (confirm('Are you sure to delete ' + company.name)) {
      this.companyService.delete(company.id).subscribe((data) => {
        this.companies.splice(
          this.companies.findIndex((comp) => comp.id == company.id),
          1
        );
        this._snackBar.open('Company successfully deleted.', 'Close', {
          duration: 4000,
        });
        if (this.selectedCompany?.id == company.id) {
          this.selectedCompany = null;
          this.companyForm.reset();
          this.router.navigateByUrl('companies');
        }
      });
    }
  }
  onPhoneFieldChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    let formattedValue = '';
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length == 0)
      this.companyForm.controls.phoneNumber.setErrors({ required: true });
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
        this.companyForm.controls.phoneNumber.setErrors({ pattern: true });
    }
    input.value = formattedValue;
  }
}
