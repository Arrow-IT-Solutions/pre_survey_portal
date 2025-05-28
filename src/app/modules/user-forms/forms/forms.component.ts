import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { SurveyServiceService } from 'src/app/layout/service/survey-service.service';
import { CustomerRequest } from '../../customers/customers.module';
import { SurveySession } from '../../SurveySession/survey-session/survey-session.module';
import { CountryCodeService } from 'src/app/Core/services/country-code.service';
import { CountryCodeResponse, CountryCodeSearchRequest } from '../../auth/auth.module';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { ConstantService } from 'src/app/Core/services/constant.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  dataForm!: FormGroup;
  btnLoading: boolean = false;
  currentlang = 'Arabic';
  formUuid: string;
  codes: CountryCodeResponse[] = [];
  martialStatus: ConstantResponse[] = [];
  submitted: boolean = false;
  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    public route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyServiceService,
    public countryCodeService: CountryCodeService,
    public constantService: ConstantService) {
    this.dataForm = this.formBuilder.group({
      userName: ['', Validators.required],
      maritalStatus: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      countryCode: [null, Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      info: ['', Validators.required],
      sendOffers: [null, Validators.required],

    })
  }
  async ngOnInit() {
    this.formUuid = this.route.snapshot.paramMap.get('uuid')!;
    await this.RetriveCountryCode();
    const maritalStatus = await this.constantService.Search('SocialStatus') as any;
    this.martialStatus = maritalStatus.data;
    this.checkCurrentLang();

  }

  async RetriveCountryCode() {

    var code: any;

    let filter: CountryCodeSearchRequest = {
      name: '',
      uuid: '',
      code: '',
      pageIndex: "",
      pageSize: '100000'
    }

    const response = await this.countryCodeService.Search(filter) as any

    this.codes = response.data;

    await this.ReWriteCode();

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

  changeLang(lang: string) {
    console.log("current Lang : ", lang);

    if (lang == 'en') {
      this.currentlang = "English"
      this.layoutService.config =
      {
        dir: 'ltr',
        lang: 'en'
      }

    }
    else if (lang == 'ar') {
      this.currentlang = "عربي"
      this.layoutService.config =
      {
        dir: 'rtl',
        lang: 'ar'
      }
    }

    localStorage.setItem('lang', this.layoutService.config.lang);
    localStorage.setItem('dir', this.layoutService.config.dir);
    this.document.documentElement.lang = this.layoutService.config.lang;

    window.location.reload();
  }

  checkCurrentLang() {
    if (this.layoutService.config.lang == 'en') {
      this.currentlang = "English"


    }
    else if (this.layoutService.config.lang == 'ar') {
      this.currentlang = "عربي"

    }
  }

  start() {

    if (this.dataForm.invalid) {
      this.submitted = true;
      this.dataForm.markAllAsTouched();
      return;
    }

    let birthDate = new Date(this.dataForm.controls['dateOfBirth'].value)


    var customerTranslation = [
      {
        fullName: this.dataForm.controls['userName'].value == null ? '' : this.dataForm.controls['userName'].value.toString(),
        language: 'ar'
      },
      {
        fullName: this.dataForm.controls['userName'].value == null ? '' : this.dataForm.controls['userName'].value.toString(),
        language: 'en'
      }
    ];

    var addCustomer: CustomerRequest = {
      customerTranslation: customerTranslation,
      birthDate: birthDate.toISOString(),
      socialStatus: this.dataForm.controls['maritalStatus'].value == null ? null : this.dataForm.controls['maritalStatus'].value.toString(),
      state: this.dataForm.controls['country'].value == null ? null : this.dataForm.controls['country'].value.toString(),
      email: this.dataForm.controls['email'].value == null ? null : this.dataForm.controls['email'].value.toString(),
      phone: this.dataForm.controls['phoneNumber'].value == null ? null : this.dataForm.controls['countryCode'].value + this.dataForm.controls['phoneNumber'].value.toString(),
      knowingUs: this.dataForm.controls['info'].value == null ? null : this.dataForm.controls['info'].value.toString(),
      isAgree: this.dataForm.controls['sendOffers'].value.toString()
    };
    const session: SurveySession = {
      formUuid: this.formUuid,
      customer: addCustomer,
    };
    this.surveyService.setSession(session);

    this.router.navigate(['user-questions']);
  }

}
