import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReportsComponent } from './print-reports.component';

describe('PrintReportsComponent', () => {
  let component: PrintReportsComponent;
  let fixture: ComponentFixture<PrintReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintReportsComponent]
    });
    fixture = TestBed.createComponent(PrintReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
