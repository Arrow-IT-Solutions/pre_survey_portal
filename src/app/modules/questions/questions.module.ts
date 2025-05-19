import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { ResponseBase } from 'src/app/shared/class/class';
import { OptionResponse } from '../options/options.module';


@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }

export interface QuestionResponse extends ResponseBase {
  uuid?: string;
  questionTranslations?: { [key: string]: QuestionTranslationResponse };
  options?: OptionResponse[];
  forms?: FormResponse[];
}

export interface QuestionTranslationResponse {
  uuid?: string;
  questionText?: string;
  language?: string;
}


export interface FormResponse extends ResponseBase {
  uuid?: string;
  formTranslations?: { [key: string]: FormTranslationResponse };

}

export interface FormTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}
