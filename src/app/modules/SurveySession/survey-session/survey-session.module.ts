import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionResponse } from '../../questions/questions.module';
import { CustomerRequest } from '../../customers/customers.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SurveySessionModule { }


export interface SurveySession {
  formUuid?: string;
  customer: CustomerRequest;
  questions?: QuestionResponse[];
  answers?: Record<string, string>;
}
