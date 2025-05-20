import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';

import { AddQuestionComponent } from './add-question/add-question.component';

const routes: Routes = [
  {
    path:'',
    component:QuestionsComponent
  },
  {
    path:'add-question',
    component:AddQuestionComponent,
     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
