import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesAddFormComponent } from './companies-add-form.component';

describe('CompaniesAddFormComponent', () => {
  let component: CompaniesAddFormComponent;
  let fixture: ComponentFixture<CompaniesAddFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesAddFormComponent]
    });
    fixture = TestBed.createComponent(CompaniesAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
