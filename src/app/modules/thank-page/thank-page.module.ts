import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankPageRoutingModule } from './thank-page-routing.module';
import { ThankPageComponent } from './thank-page/thank-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ThankPageComponent
  ],
  imports: [
    CommonModule,
    ThankPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ThankPageModule { }
