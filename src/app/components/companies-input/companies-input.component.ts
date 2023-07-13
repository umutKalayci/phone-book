import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from 'src/app/pages/companies';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies-input',
  templateUrl: './companies-input.component.html',
  styleUrls: ['./companies-input.component.scss'],
})
export class CompaniesInputComponent {
  maxHeight = '140px';
  companies: Company[] = [];
  @Input() personCompanies!: Number[];
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
    this.personCompanies.push(this.companies[0].id);
  }
}
