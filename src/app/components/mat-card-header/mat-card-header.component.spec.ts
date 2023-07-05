import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardHeaderComponent } from './mat-card-header.component';

describe('MatCardHeaderComponent', () => {
  let component: MatCardHeaderComponent;
  let fixture: ComponentFixture<MatCardHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatCardHeaderComponent]
    });
    fixture = TestBed.createComponent(MatCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
