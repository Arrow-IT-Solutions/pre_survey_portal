import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportForPrintRoutingModule } from './report-for-print-routing.module';
import { PrintReportsComponent } from './print-reports/print-reports.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PrintReportsComponent
  ],
  imports: [
    CommonModule,
    ReportForPrintRoutingModule,
    SharedModule
  ]
})
export class ReportForPrintModule { }
