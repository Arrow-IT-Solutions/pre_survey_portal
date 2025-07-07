import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';


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
  uuid?: string;
  customerTranslation?: { [key: string]: CustomerTranslationResponse };
  socialStatus?: string;
  gender?: string;
  age?: string;
  socialStatusValue?: string;
  genderValue?: string;
  phone?: string;
  birthDate?: string;
  email?: string;
  state?: string;
  knowingUs?: string;
  isAgree?: string;
}

export interface CustomerTranslationResponse {
  uuid?: string;
  fullName?: string;
  language?: string;
}

export interface CustomerSearchRequest extends SearchRequestBase {
  uuid?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  socialStatus?: string;
  gender?: string;
  age?: string;
  isAgree?: string;
}

export interface CustomerRequest extends RequestBase {
  uuid?: string;
  customerTranslation?: CustomerTranslationRequest[];
  socialStatus?: string;
  gender?: string;
  age?: string;
  phone?: string;
  birthDate?: string;
  email?: string;
  state?: string;
  knowingUs?: string;
  isAgree?: string;
}

export interface CustomerTranslationRequest {
  uuid?: string;
  fullName?: string;
  language?: string;
}

export interface CustomerUpdateRequest extends RequestBase {
  uuid?: string;
  customerTranslation?: CustomerTranslationUpdateRequest[];
  socialStatus?: string;
  gender?: string;
  age?: string;
  phone?: string;
  birthDate?: string;
  email?: string;
  state?: string;
  knowingUs?: string;
  isAgree?: string;
}

export interface CustomerTranslationUpdateRequest {
  uuid?: string;
  fullName?: string;
  language?: string;
}
