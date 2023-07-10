import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesInputComponent } from './companies-input.component';

describe('CompaniesInputComponent', () => {
  let component: CompaniesInputComponent;
  let fixture: ComponentFixture<CompaniesInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesInputComponent]
    });
    fixture = TestBed.createComponent(CompaniesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
