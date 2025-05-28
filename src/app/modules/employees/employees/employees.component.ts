import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/layout/service/employee.service';
import { EmployeeResponse } from '../employees.module';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EmployeesComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
   constructor(public formBuilder: FormBuilder,public employeeService:EmployeeService,public translate: TranslateService, public layoutService: LayoutService,) {
    this.dataForm = this.formBuilder.group({
      employeeName: [''],
      phone: [''],
      id: [''],
      role: [''],
      userName: ['']
    });
  }
  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }
   paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)

  }
  async FillData(pageIndex: number = 0) {
    this.loading = true;
  }
   async ngOnInit() {
    await this.FillData();
  }
  Search() {
    this.FillData();
  }
  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }
 openDialog(row: EmployeeResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.employeeService.SelectedData = row
    let content = this.employeeService.SelectedData == null ? 'Create_Employee' : 'Update_Employee';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddEmployeeComponent, content);
    this.employeeService.Dialog = component;

    console.log("component : ",component);

   
  }
 
}
