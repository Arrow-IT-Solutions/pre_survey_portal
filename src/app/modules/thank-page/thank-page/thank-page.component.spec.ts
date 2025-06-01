import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankPageComponent } from './thank-page.component';

describe('ThankPageComponent', () => {
  let component: ThankPageComponent;
  let fixture: ComponentFixture<ThankPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankPageComponent]
    });
    fixture = TestBed.createComponent(ThankPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
