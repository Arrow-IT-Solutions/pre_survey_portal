import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';

const routes: Routes = [
  {
    path:'',
    component:AnswersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersAnswersRoutingModule { }
