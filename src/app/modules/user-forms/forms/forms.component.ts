import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { SurveyServiceService } from 'src/app/layout/service/survey-service.service';
import { CustomerRequest } from '../../customers/customers.module';
import { SurveySession } from '../../SurveySession/survey-session/survey-session.module';
import { CountryCodeService } from 'src/app/Core/services/country-code.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { CountryCodeResponse, CountryCodeSearchRequest } from '../../country-code/country-code.module';
import { SelectItem } from 'primeng/api';
import { SettingResponse, SettingSearchRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  monthOptions: SelectItem[] = Array.from({ length: 12 }, (_, i) => ({
    label: (i + 1).toString(),
    value: i + 1,
  }));

  dayOptions: SelectItem[] = Array.from({ length: 31 }, (_, i) => ({
    key: i + 1,
    value: (i + 1).toString(),
  }));

  yearOptions: SelectItem[] = Array.from({ length: 2007 - 1960 + 1 }, (_, i) => ({
  label: (1960 + i).toString(),
  value: 1960 + i,
}));
 ageOptions: SelectItem[] = Array.from({ length: 65 - 18 + 1 }, (_, i) => ({
  label: (18 + i).toString(),
  value: 18 + i,
}));

  dataForm!: FormGroup;
  btnLoading: boolean = false;
  unCurrentlang: string;
  currentlang: string;
  langCode: string;
  formUuid: string;
  loading = false;
  codes: CountryCodeResponse[] = [];
  martialStatus: ConstantResponse[] = [];
  genderOptions: ConstantResponse[] = [];
  submitted: boolean = false;
  settingData: SettingResponse | null = null;
  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    public route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyServiceService,
    public countryCodeService: CountryCodeService,
    public settingService: SettingsService,
    public constantService: ConstantService) {
    this.dataForm = this.formBuilder.group({
      userName: ['', Validators.required],
      maritalStatus: [null, Validators.required],
      countryCode: [null, Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['',],
      country: ['', Validators.required],
      info: ['', Validators.required],
      sendOffers: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      day: [null, Validators.required],
      age:[null, Validators.required],
      gender:[null, Validators.required]

    })

  }


  async ngOnInit() {
    this.formUuid = this.route.snapshot.paramMap.get('uuid')!;
    this.surveyService.formUUID = this.formUuid;
    await this.RetriveCountryCode();
    await this.GetSettingData();
    const maritalStatus = await this.constantService.Search('SocialStatus') as any;
    this.martialStatus = maritalStatus.data;

    const gender = await this.constantService.Search('Gender') as any;
    this.genderOptions = gender.data;

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

    if (lang == 'ar') {
      this.currentlang = "English"
      this.layoutService.config =
      {
        dir: 'ltr',
        lang: 'en'
      }
      this.loading=true;

    }
    else if (lang == 'en') {
      this.currentlang = "عربي"
      this.layoutService.config =
      {
        dir: 'rtl',
        lang: 'ar'
      }
      this.loading=true;
    }

    localStorage.setItem('lang', this.layoutService.config.lang);
    localStorage.setItem('dir', this.layoutService.config.dir);
    this.document.documentElement.lang = this.layoutService.config.lang;

    window.location.reload();
  }

  checkCurrentLang() {
    const lang = localStorage.getItem('lang');

    if (lang === 'en') {
      this.currentlang = "English";
      this.unCurrentlang = "عربي";
      this.langCode = "en"
    } else if (lang === 'ar') {
      this.currentlang = "Arabic";
      this.unCurrentlang = "English";
      this.langCode = "ar"
    }
  }

  start() {

    if (this.dataForm.invalid) {
      this.submitted = true;
      this.dataForm.markAllAsTouched();
      return;
    }

    const year = this.dataForm.get('year')!.value;
    const month = this.dataForm.get('month')!.value;
    const day = this.dataForm.get('day')!.value;

    const mm = month < 10 ? '0' + month : month.toString();
    const dd = day < 10 ? '0' + day : day.toString();

    let birthDate = `${year}-${mm}-${dd}`;


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
      birthDate: birthDate,
      socialStatus: this.dataForm.controls['maritalStatus'].value == null ? null : this.dataForm.controls['maritalStatus'].value.toString(),
      gender: this.dataForm.controls['gender'].value == null ? null : this.dataForm.controls['gender'].value.toString(),
      age: this.dataForm.controls['age'].value == null ? null : this.dataForm.controls['age'].value.toString(),
      state: this.dataForm.controls['country'].value == null ? null : this.dataForm.controls['country'].value.toString(),
      email: this.dataForm.controls['email'].value == null ? null : this.dataForm.controls['email'].value.toString(),
      phone: this.dataForm.controls['phoneNumber'].value == null ? null : this.dataForm.controls['countryCode'].value + this.dataForm.controls['phoneNumber'].value.toString(),
      knowingUs: this.dataForm.controls['info'].value == null ? null : this.dataForm.controls['info'].value.toString(),
      isAgree: this.dataForm.controls['sendOffers'].value.toString() == 'Yes' ? 'True' : 'False'
    };
    const session: SurveySession = {
      formUuid: this.formUuid,
      customer: addCustomer,
    };
    this.surveyService.setSession(session);

    this.router.navigate(['user-questions']);
  }

  async GetSettingData(pageIndex: number = 0) {

    this.settingData = null;

    let filter: SettingSearchRequest = {
      uuid: '',
      name: '',
    };

    const response = (await this.settingService.Search(filter)) as any;

    if (response.data == null || response.data.length == 0) {
      this.settingData = null;
    } else if (response.data != null && response.data.length != 0) {
      this.settingData = response.data[0];
      console.log(this.settingData)
    }

  }

}
