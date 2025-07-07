import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintReportsComponent } from './print-reports/print-reports.component';

const routes: Routes = [
  {
    path:'',
    component:PrintReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportForPrintRoutingModule { }
