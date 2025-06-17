import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCodesComponent } from './country-codes.component';

describe('CountryCodesComponent', () => {
  let component: CountryCodesComponent;
  let fixture: ComponentFixture<CountryCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryCodesComponent]
    });
    fixture = TestBed.createComponent(CountryCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
