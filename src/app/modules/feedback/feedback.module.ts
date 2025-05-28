import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModelComponent } from './alert-model/alert-model.component';
import { FeedBacksComponent } from './feed-backs/feed-backs.component';
import { RequestBase, ResponseBase, SearchRequestBase } from 'src/app/shared/class/class';
import { UserResponse } from '../auth/auth.module';


@NgModule({
  declarations: [
    FeedbackComponent,
    AlertModelComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FeedbackModule { }



