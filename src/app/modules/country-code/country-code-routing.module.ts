import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryCodesComponent } from './country-codes/country-codes.component';


const routes: Routes = [
  {
    path:"",
    component:CountryCodesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryCodeRoutingModule { }
