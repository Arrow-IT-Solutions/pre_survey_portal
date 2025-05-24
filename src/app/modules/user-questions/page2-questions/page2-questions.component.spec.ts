import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page2QuestionsComponent } from './page2-questions.component';

describe('Page2QuestionsComponent', () => {
  let component: Page2QuestionsComponent;
  let fixture: ComponentFixture<Page2QuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Page2QuestionsComponent]
    });
    fixture = TestBed.createComponent(Page2QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
