import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/Core/services/employees.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService } from 'primeng/api';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { CountryCodeService } from 'src/app/Core/services/country-code.service';
import { CountryCodeResponse, CountryCodeSearchRequest } from '../../auth/auth.module';
import { EmployeeRequest, EmployeeSearchRequest, EmployeeUpdateRequest, EmployeesResponse } from '../employees.module';
import { PasswordComponent } from '../../Password/password.component';
import { TranslateService } from '@ngx-translate/core';

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
  gender: ConstantResponse[] = [];
  codes: CountryCodeResponse[] = [];
  file: any;
  fileInput: any
  img: boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public employeeService: EmployeesService,
    public constantService: ConstantService,
    public countryCodeService: CountryCodeService,
    public translate: TranslateService
  ) {
    this.dataForm = formBuilder.group({
      firstNameAr: ['', Validators.required],
      lastNameAr: ['', Validators.required],
      firstNameEn: ['', Validators.required],
      lastNameEn: ['', Validators.required],
      contryCode: ['', Validators.required],
      clientPhone: ['', Validators.required],
      clientGender: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: ['', Validators.required]

    })
  }

  async ngOnInit() {
    try {
      this.loading = true;
      await this.RetriveCountryCode();
      const GenderResponse = await this.constantService.Search('Gender') as any;
      this.gender = GenderResponse.data;
      this.resetForm();

      if (this.employeeService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }

  async RetriveCountryCode() {

    var code: any;

    if (this.employeeService.SelectedData != null) {
      code = this.employeeService.SelectedData?.user?.countryCode
    }

    let filter: CountryCodeSearchRequest = {
      name: '',
      uuid: '',
      code: code,
      pageIndex: "",
      pageSize: '100000'
    }

    const response = await this.countryCodeService.Search(filter) as any

    this.codes = response.data;

    await this.ReWriteCode();

  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async onSubmit() {
    try {
      this.btnLoading = true;

      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }
      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }


  async Save() {

    let response;
    let birthDate = new Date(this.dataForm.controls['birthDate'].value)

    var clientTranslation = [
      {
        firstName: this.dataForm.controls['firstNameAr'].value == null ? '' : this.dataForm.controls['firstNameAr'].value.toString(),
        lastName: this.dataForm.controls['lastNameAr'].value == null ? '' : this.dataForm.controls['lastNameAr'].value.toString(),
        language: 'ar'
      },
      {
        firstName: this.dataForm.controls['firstNameEn'].value == null ? '' : this.dataForm.controls['firstNameEn'].value.toString(),
        lastName: this.dataForm.controls['lastNameEn'].value == null ? '' : this.dataForm.controls['lastNameEn'].value.toString(),
        language: 'en'
      }
    ];

    if (this.employeeService.SelectedData != null) {
      // update

      var employee: EmployeeUpdateRequest = {
        uuid: this.employeeService.SelectedData?.uuid?.toString(),
        employeeTranslation: clientTranslation,
        countryCode: this.dataForm.controls['contryCode'].value,
        gender: this.dataForm.controls['clientGender'].value.toString(),
        birthDate: birthDate.toISOString(),
        phone: this.dataForm.controls['clientPhone'].value.toString(),
        profileImage: this.file,
        deviceType: '',
        email: this.dataForm.controls['username'].value

      };
      response = await this.employeeService.Update(employee);


      if (response.requestStatus == "200") {
        this.employeeService.Dialog.adHostChild.viewContainerRef.clear();
        this.employeeService.Dialog.adHostDynamic.viewContainerRef.clear();
      }

    } else {
      // add

      var addEmployee: EmployeeRequest = {
        employeeTranslation: clientTranslation,
        countryCode: this.dataForm.controls['contryCode'].value.toString(),
        gender: this.dataForm.controls['clientGender'].value.toString(),
        birthDate: birthDate.toISOString(),
        phone: this.dataForm.controls['clientPhone'].value.toString(),
        image: this.file,
        email: this.dataForm.controls['username'].value
      };
      response = await this.employeeService.Add(addEmployee);
      if (response != null) {
        if (response.requestStatus == 200) {
          this.employeeService.SelectedData = response
          this.OpenInfoPage(this.employeeService.SelectedData)
          this.employeeService.Dialog.close();

        }
      }
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {

    console.log('HERE')
    let temp = {
      firstNameAr: this.employeeService.SelectedData?.user.userTranslation!['ar'].firstName,
      lastNameAr: this.employeeService.SelectedData?.user.userTranslation!['ar'].lastName,
      firstNameEn: this.employeeService.SelectedData?.user.userTranslation!['en'].firstName,
      lastNameEn: this.employeeService.SelectedData?.user.userTranslation!['en'].lastName,
      contryCode: this.employeeService.SelectedData?.user.countryCode,
      clientPhone: this.employeeService.SelectedData?.phone,
      clientGender: Number(this.employeeService.SelectedData?.gender),
      birthDate: this.employeeService.SelectedData?.birthDate,
      username: this.employeeService.SelectedData?.user.username
    };
    this.fileInput = this.employeeService.SelectedData?.image,
      this.img = false
    this.dataForm.patchValue(temp);

  }
  getGenderLable(): string {
    return this.layoutService.config.lang == 'ar' ? 'nameAr' : 'nameEn';
  }
  async FillCodes(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: CountryCodeSearchRequest = {

      name: filterInput,
      uuid: '',
      code: "",
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.countryCodeService.Search(filter) as any

    this.codes = response.data;

    await this.ReWriteCode()
  }
  ReWriteCode(): any {

    var codeDTO: any[] = []

    this.codes.map(code => {
      const translation = code.countryCodeTranslation?.[this.layoutService.config.lang] as any;
      const fullName = translation?.name;
      const countryCode = code.code

      var obj =
      {
        ...code,
        fullName: `${fullName} ${code.code}`,
        countryCode

      }

      codeDTO.push(obj)

    })

    this.codes = codeDTO;

  }

  OnSelectFile(file) {
    this.file = file;
    this.img = false;
  }


  async OpenInfoPage(response) {

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.employeeService.SelectedData = response
    let content = 'Info';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(PasswordComponent, content);
    this.employeeService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }


}
