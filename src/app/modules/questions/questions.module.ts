import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase } from 'src/app/shared/class/class';
import { AddQuestionComponent } from './add-question/add-question.component';



@NgModule({
  declarations: [
    QuestionsComponent,
    AddQuestionComponent,
   
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuestionsModule { }
export interface QuestionResponse extends ResponseBase {
  
}
