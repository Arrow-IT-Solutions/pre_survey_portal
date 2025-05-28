import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options/options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddOptionComponent } from './add-option/add-option.component';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    OptionsComponent,
    AddOptionComponent
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,
     ReactiveFormsModule,
        SharedModule
  ]
})
export class OptionsModule { }
export interface OptionResponse extends ResponseBase {
  uuid?: string;
  optionTranslation?: { [key: string]: OptionTranslationResponse };

}

export interface OptionTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}

export interface OptionSearchRequest extends SearchRequestBase {
  uuid?: string;
  name?: string;
}

export interface OptionRequest extends RequestBase {
  uuid?: string;
  optionTranslation?: OptionTranslationRequest[];
}

export interface OptionTranslationRequest {
  uuid?: string;
  name?: string;
  language?: string;
}

export interface OptionUpdateRequest extends RequestBase {
  uuid?: string;
  optionTranslation?: OptionTranslationUpdateRequest[];
}

export interface OptionTranslationUpdateRequest {
  uuid?: string;
  name?: string;
  language?: string;
}

