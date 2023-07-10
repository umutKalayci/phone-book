import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company, companies } from 'src/app/pages/companies';

@Component({
  selector: 'app-companies-input',
  templateUrl: './companies-input.component.html',
  styleUrls: ['./companies-input.component.scss'],
})
export class CompaniesInputComponent {
  maxHeight = '140px';
  companies: Company[] = companies;
  @Input() personCompanies!: Company[];
  @Output() personCompaniesChange: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {}
  removeCompanyField(index: number) {
    this.personCompanies.splice(index, 1);
  }
  addPersonCompany() {
    this.personCompanies.push(companies[0]);
  }
}
