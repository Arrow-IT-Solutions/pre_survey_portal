import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestBase, ResponseBase } from 'src/app/shared/class/class';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EmployeesModule { }
export interface EmployeeResponse extends ResponseBase
{

}
export interface EmployeeRequest extends RequestBase {}
export interface EmployeeTranslationResponse {
  
}
export interface EmployeeTranslationRequest {
  
}
export interface EmployeeTranslationUpdateRequest {
 
}
