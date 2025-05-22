import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1QuestionsComponent } from './page1-questions.component';

describe('Page1QuestionsComponent', () => {
  let component: Page1QuestionsComponent;
  let fixture: ComponentFixture<Page1QuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Page1QuestionsComponent]
    });
    fixture = TestBed.createComponent(Page1QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
