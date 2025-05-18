import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersRoutingModule } from './answers-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnswersComponent
  ],
  imports: [
    CommonModule,
    AnswersRoutingModule,
     ReactiveFormsModule,
    SharedModule
  ]
})
export class AnswersModule { }
