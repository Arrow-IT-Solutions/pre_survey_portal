import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryCodesComponent } from './country-codes/country-codes.component';
import { AddCountryCodeComponent } from './add-country-code/add-country-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryCodeRoutingModule } from './country-code-routing.module';
import { RequestBase, SearchRequestBase } from 'src/app/shared/class/class';


@NgModule({
  declarations: [
    CountryCodesComponent,
    AddCountryCodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CountryCodeRoutingModule
  ]
})
export class CountryCodeModule { }

export interface CountryCodeResponse {
  uuid?: string;
  countryCodeTranslation?: { [key: string]: CountryCodeTranslationResponse };
  code: string;
  flag: string
}

export interface CountryCodeTranslationResponse {
  uuid?: string;
  name?: string;
  language?: string;
}

export interface CountryCodeSearchRequest extends SearchRequestBase {
  uuid?: string;
  name?: string;
  code?: string;
}

export interface CountryCodeRequest extends RequestBase {
  uuid?: string;
  countryCodeTranslation?: CountryCodeTranslationRequest[];
  code?: string;
  flag?: string;
}

export interface CountryCodeTranslationRequest {
  uuid?: string;
  name?: string;
  language?: string;
}

export interface CountryCodeUpdateRequest extends RequestBase {
  uuid?: string;
  countryCodeTranslation?: CountryCodeTranslationUpdateRequest[];
  code?: string;
  flag?: string;
}

export interface CountryCodeTranslationUpdateRequest {
  uuid?: string;
  name?: string;
  language?: string;
}
