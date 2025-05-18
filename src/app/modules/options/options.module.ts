import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options/options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddOptionComponent } from './add-option/add-option.component';
import { ResponseBase } from 'src/app/shared/class/class';


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
  
}
