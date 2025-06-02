import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryCodeComponent } from './add-country-code.component';

describe('AddCountryCodeComponent', () => {
  let component: AddCountryCodeComponent;
  let fixture: ComponentFixture<AddCountryCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCountryCodeComponent]
    });
    fixture = TestBed.createComponent(AddCountryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
