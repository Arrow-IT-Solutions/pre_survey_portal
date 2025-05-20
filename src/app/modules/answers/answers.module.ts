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
  CustomerName?: string;
  OptionName?: string;
  includeQuestion?: string;
  includeOption?: string;
  includeCustomer?: string;
}

export interface AnswerResponse extends ResponseBase {
  uuid?: string;
  questionIDFK?: string;
  optionIDFK?: string;
  customerIDFK?: string;
  question?: QuestionResponse;
  option?: OptionResponse;
  customer?: CustomerResponse;
}

