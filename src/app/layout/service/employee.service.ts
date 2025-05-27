import { Injectable } from '@angular/core';
import { EmployeeResponse } from 'src/app/modules/employees/employees.module';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public SelectedData: EmployeeResponse | null = null;
  public Dialog: any | null = null;
}