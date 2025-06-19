import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneretReportsComponent } from './generet-reports.component';

describe('GeneretReportsComponent', () => {
  let component: GeneretReportsComponent;
  let fixture: ComponentFixture<GeneretReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneretReportsComponent]
    });
    fixture = TestBed.createComponent(GeneretReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
