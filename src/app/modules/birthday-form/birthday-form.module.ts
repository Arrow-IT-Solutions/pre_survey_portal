import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirthdayFormRoutingModule } from './birthday-form-routing.module';
import { BirthdayComponent } from './birthday/birthday.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BirthdayComponent
  ],
  imports: [
    CommonModule,
    BirthdayFormRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BirthdayFormModule { }
