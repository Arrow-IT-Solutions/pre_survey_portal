import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgPrimeModule,
    SharedModule
  ]
})
export class DashboardModule { }
export interface DashboardResponse extends ResponseBase {
  offersCount?: string
  redeemCount?: string,
  customersCount?: string,
  employeesCount: string,
  transferCount?: string,
  quattrosCount?: string,
  productsCount: string,
  featuresCount?: string,
  clientChartDatas?: ClientChartData[]
}


export interface DashboardSearchRequest extends SearchRequestBase {
  dateFrom?: string
  dateTo?: string

}

export interface ClientChartData {
  day?: string
  count?: string

}


