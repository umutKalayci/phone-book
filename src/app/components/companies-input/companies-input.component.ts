import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { Company, companies } from 'src/app/pages/companies';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies-input',
  templateUrl: './companies-input.component.html',
  styleUrls: ['./companies-input.component.scss'],
})
export class CompaniesInputComponent {
  maxHeight = '140px';
  companies: Company[] = [];
  @Input() personCompanies!: Company[];
  @Output() personCompaniesChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private companyService: CompanyService) {}
  ngOnInit() {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }
  removeCompanyField(index: number) {
    this.personCompanies.splice(index, 1);
  }
  addPersonCompany() {
    this.personCompanies.push(companies[0]);
  }
}
