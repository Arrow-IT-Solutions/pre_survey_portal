import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionResponse } from '../../questions/questions.module';
import { CustomerRequest } from '../../customers/customers.module';
import { ResponseBase } from 'src/app/shared/class/class';



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
  answers?: AnswerPair[]
}

export interface AnswerPair {
  questionUUID: string;
  optionUUID: string;
}

export interface SubmitAnswersRequest {
  formUUID: string;
  answers: AnswerPair[];
  customer: CustomerRequest;
}

export interface SurveyResponse extends ResponseBase {
  formUUID: string,
  customerUUID: string

}
