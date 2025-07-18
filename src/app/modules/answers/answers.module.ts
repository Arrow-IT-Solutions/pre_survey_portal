import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersRoutingModule } from './answers-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { OptionResponse } from '../options/options.module';
import { CustomerResponse } from '../customers/customers.module';
import { QuestionResponse } from '../questions/questions.module';
import { FormResponse } from '../form/form.module';


@NgModule({
  declarations: [
    AnswersComponent
  ],
  imports: [
    CommonModule,
    AnswersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AnswersModule { }

export interface AnswerSearchRequest extends SearchRequestBase {
  uuid?: string;
  questionIDFK?: string;
  optionIDFK?: string;
  customerIDFK?: string;
  formIDFK?: string;
  CustomerName?: string;
  OptionName?: string;
  formName?: string;
  phone?: string;
  fromDate?: string;
  toDate?: string;
  gender?: string;
  martialStatus?: string;
  lang?: string;
  includeQuestion?: string;
  includeOption?: string;
  includeCustomer?: string;
  includeForm?: string;
}

export interface AnswerReportRequest extends SearchRequestBase {
  fromDate: string,
  toDate: string,
  lang: string,
  includeQuestion?: string;
  includeOption?: string;
  includeCustomer?: string;
  includeForm?: string;
}

export interface AnswerResponse extends ResponseBase {
  uuid?: string;
  questionIDFK?: string;
  optionIDFK?: string;
  customerIDFK?: string;
  formIDFK?: string;
  question?: QuestionResponse;
  option?: OptionResponse;
  customer?: CustomerResponse;
  form?: FormResponse;
  // numberOfCustomers?: number;
}

