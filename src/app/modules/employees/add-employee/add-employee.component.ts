import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/layout/service/employee.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [MessageService]
})
export class AddEmployeeComponent {
dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  gender:[];
  codes: [];
  file: any;
  fileInput: any
  img: boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public employeeService: EmployeeService,
    public translate: TranslateService
  ) {
    this.dataForm = formBuilder.group({
      firstNameAr: [''],
      lastNameAr: [''],
      firstNameEn: [''],
      lastNameEn: [''],
      contryCode: [''],
      clientPhone: [''],
      clientGender: [''],
      birthDate: [''],
      username: ['']

    })
  }
  async ngOnInit() {}
   get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async onSubmit() {}
    resetForm() {
    this.dataForm.reset();
  }

  async FillData() {}

  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }
}
