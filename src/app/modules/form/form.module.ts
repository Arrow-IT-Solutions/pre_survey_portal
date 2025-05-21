import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form/form.component';
import { AddFormComponent } from './add-form/add-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/class/class';


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
export interface formResponse extends ResponseBase {
 
}
