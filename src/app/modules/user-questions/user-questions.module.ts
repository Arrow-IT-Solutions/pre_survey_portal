import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserQuestionsRoutingModule } from './user-questions-routing.module';
import { Page1QuestionsComponent } from './page1-questions/page1-questions.component';
import { Page2QuestionsComponent } from './page2-questions/page2-questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    Page1QuestionsComponent,
    Page2QuestionsComponent
  ],
  imports: [
    CommonModule,
    UserQuestionsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserQuestionsModule { }
