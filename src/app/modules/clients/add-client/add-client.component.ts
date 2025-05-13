import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/Core/services/clients.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ImgControlComponent } from 'src/app/layout/component/img-control/img-control.component';
import { ClientRequest, ClientUpdateRequest } from '../clients.module';
import { MessageService } from 'primeng/api';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { CountryCodeService } from 'src/app/Core/services/country-code.service';
import { CountryCodeResponse, CountryCodeSearchRequest } from '../../auth/auth.module';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  providers: [MessageService]
})
export class AddClientComponent {
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
    public clientService: ClientsService,
    public constantService: ConstantService,
    public countryCodeService: CountryCodeService,
    public messageService: MessageService
  ) {
    this.dataForm = formBuilder.group({
      firstNameAr: ['', Validators.required],
      lastNameAr: ['', Validators.required],
      firstNameEn: ['', Validators.required],
      lastNameEn: ['', Validators.required],
      contryCode: ['', Validators.required],
      clientPhone: ['', Validators.required],
      clientGender: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required]

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      await this.RetriveCountryCode();
      const GenderResponse = await this.constantService.Search('Gender') as any;
      this.gender = GenderResponse.data;

      this.resetForm();

      if (this.clientService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
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

  async RetriveCountryCode() {

    var code: any;

    if (this.clientService.SelectedData != null) {
      code = this.clientService.SelectedData?.user?.countryCode
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

    if (this.clientService.SelectedData != null) {
      // update

      var client: ClientUpdateRequest = {
        uuid: this.clientService.SelectedData?.uuid?.toString(),
        clientTranslation: clientTranslation,
        countryCode: this.dataForm.controls['contryCode'].value,
        gender: this.dataForm.controls['clientGender'].value.toString(),
        birthDate: birthDate.toISOString(),
        phone: this.dataForm.controls['clientPhone'].value.toString(),
        profileImage: this.file,
        deviceType: ''

      };
      console.log(client)
      response = await this.clientService.Update(client);

    } else {
      // add

      var addClient: ClientRequest = {
        clientTranslation: clientTranslation,
        countryCode: this.dataForm.controls['contryCode'].value.toString(),
        gender: this.dataForm.controls['clientGender'].value.toString(),
        birthDate: birthDate.toISOString(),
        phone: this.dataForm.controls['clientPhone'].value.toString(),
        password: this.dataForm.controls['password'].value.toString(),
        profileImage: this.file,
      };
      console.log(addClient)

      response = await this.clientService.Add(addClient);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.clientService.SelectedData == null) {
        this.resetForm();
      } else {
        setTimeout(() => {
          this.clientService.Dialog.adHostChild.viewContainerRef.clear();
          this.clientService.Dialog.adHostDynamic.viewContainerRef.clear();
        }, 600);
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
  }

  async FillData() {
    let temp = {
      firstNameAr: this.clientService.SelectedData?.user.userTranslation!['ar'].firstName,
      lastNameAr: this.clientService.SelectedData?.user.userTranslation!['ar'].lastName,
      firstNameEn: this.clientService.SelectedData?.user.userTranslation!['en'].firstName,
      lastNameEn: this.clientService.SelectedData?.user.userTranslation!['en'].lastName,
      contryCode: this.clientService.SelectedData?.user.countryCode,
      clientPhone: this.clientService.SelectedData?.phone,
      clientGender: Number(this.clientService.SelectedData?.gender),
      birthDate: this.clientService.SelectedData?.birthDate
    };
    this.fileInput = this.clientService.SelectedData?.profileImage,
      this.img = false
    this.dataForm.patchValue(temp);

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

}
