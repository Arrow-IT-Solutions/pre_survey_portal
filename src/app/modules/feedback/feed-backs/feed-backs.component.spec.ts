import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBacksComponent } from './feed-backs.component';

describe('FeedBacksComponent', () => {
  let component: FeedBacksComponent;
  let fixture: ComponentFixture<FeedBacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedBacksComponent]
    });
    fixture = TestBed.createComponent(FeedBacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
