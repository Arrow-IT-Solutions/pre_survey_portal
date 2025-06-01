import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankPageComponent } from './thank-page/thank-page.component';

const routes: Routes = [
  {
    path:'',
    component:ThankPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankPageRoutingModule { }
