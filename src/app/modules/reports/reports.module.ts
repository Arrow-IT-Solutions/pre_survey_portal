import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneretReportsComponent } from './reports/generet-reports/generet-reports.component';
import { ResponseBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    ReportsComponent,
    GeneretReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReportsModule { }
export interface ReportResponse extends ResponseBase {


}

export interface ReportSearchRequest{

}

export interface PrintReportRequest{
  
}
