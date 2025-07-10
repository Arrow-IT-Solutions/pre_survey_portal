import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormsRoutingModule } from './user-forms-routing.module';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgPrimeModule } from 'src/app/shared/ngprime.module';


@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    UserFormsRoutingModule,
    SharedModule,   
    ReactiveFormsModule,
    NgPrimeModule
   
  ]
})
export class UserFormsModule { }
