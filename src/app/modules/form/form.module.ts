import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form/form.component';
import { AddFormComponent } from './add-form/add-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    FormComponent,
    AddFormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
export interface FormResponse extends ResponseBase {
  uuid?: string;
  formTranslations?: { [key: string]: FormTranslationResponse };

}

export interface FormTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}

export interface FormSearchRequest extends SearchRequestBase {
  uuid?: string;
  name?: string;
}

export interface FormRequest extends RequestBase {
  uuid?: string;
  formTranslations?: FormTranslationRequest[];
}

export interface FormTranslationRequest {
  uuid?: string;
  name?: string;
  language?: string;
}

export interface FormUpdateRequest extends RequestBase {
  uuid?: string;
  formTranslations?: FormTranslationUpdateRequest[];
}

export interface FormTranslationUpdateRequest {
  uuid?: string;
  name?: string;
  language?: string;
}

