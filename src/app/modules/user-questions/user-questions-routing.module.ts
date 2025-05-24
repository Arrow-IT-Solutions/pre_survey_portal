import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1QuestionsComponent } from './page1-questions/page1-questions.component';
import { Page2QuestionsComponent } from './page2-questions/page2-questions.component';

const routes: Routes = [
  {
    path:"",
    component:Page1QuestionsComponent
  },
  {
    path:"page2",
    component:Page2QuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserQuestionsRoutingModule { }
