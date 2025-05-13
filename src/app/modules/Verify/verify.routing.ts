import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyComponent } from './Verify/verify.component';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'verify/verify',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'verify',
        component: VerifyComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyRoutingModule { }
