import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ResponseBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    CustomersComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomersModule { }
export interface CustomerResponse extends ResponseBase {
  
}
