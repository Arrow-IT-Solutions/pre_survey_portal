import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { AddQuestionComponent } from './add-question/add-question.component';
import { OptionRequest, OptionResponse } from '../options/options.module';
import { FormResponse } from '../form/form.module';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [
    QuestionsComponent,
    AddQuestionComponent,

  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TagModule,
    CardModule,
    PaginatorModule,
    ButtonModule,
    MenuModule
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

export interface QuestionRequest extends RequestBase {
  uuid?: string;
  questionTranslations?: QuestionTranslationRequest[];
  formUUIDs?: string[];
  optionRequest?: OptionRequest[];
}

export interface QuestionTranslationRequest {
  uuid?: string;
  questionText?: string;
  language?: string;
}

export interface QuestionSearchRequest extends SearchRequestBase {
  uuid?: string;
  questionText?: string;
}


