import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersAnswersRoutingModule } from './customers-answers-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnswersComponent
  ],
  imports: [
    CommonModule,
    CustomersAnswersRoutingModule,
      ReactiveFormsModule,
            SharedModule
  ]
})
export class CustomersAnswersModule { }
