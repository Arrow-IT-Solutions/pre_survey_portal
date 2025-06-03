import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OptionService } from 'src/app/layout/service/option.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { OptionRequest, OptionUpdateRequest } from '../../options/options.module';
import { CountryCodeRequest, CountryCodeUpdateRequest } from '../country-code.module';
import { CountryCodeService } from 'src/app/Core/services/country-code.service';
@Component({
  selector: 'app-add-country-code',
  templateUrl: './add-country-code.component.html',
  styleUrls: ['./add-country-code.component.scss'],
  providers: [MessageService]
})
export class AddCountryCodeComponent {
 static refreshOptionsCallback: (() => void) | null = null;

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  constructor(public formBuilder: FormBuilder,
    public messageService: MessageService,
    public layoutService: LayoutService,
    public countryCodeService:CountryCodeService

  ) {
    this.dataForm = this.formBuilder.group({
      countryEn: ['', Validators.required],
      countryAr: ['', Validators.required],
      code: ['', Validators.required]

    })
  }
  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async ngOnInit() {
    try {
      this.loading = true;



      if (this.countryCodeService.SelectedData != null) {
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
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

    var countryTranslation = [
      {
        name: this.dataForm.controls['countryAr'].value == null ? '' : this.dataForm.controls['countryAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['countryEn'].value == null ? '' : this.dataForm.controls['countryEn'].value.toString(),
        language: 'en'
      }
    ];

    if (this.countryCodeService.SelectedData != null) {
      // update
      var updateCountryCode: CountryCodeUpdateRequest = {
        uuid: this.countryCodeService.SelectedData?.uuid?.toString(),
        countryCodeTranslation: countryTranslation,
        code: this.dataForm.controls['code'].value == null ? '' : this.dataForm.controls['code'].value.toString()
      };
      console.log(updateCountryCode)
      response = await this.countryCodeService.Update(updateCountryCode);
    } else {
      // add
      var addCountryCode: CountryCodeRequest = {
        countryCodeTranslation: countryTranslation,
        code: this.dataForm.controls['code'].value == null ? '' : this.dataForm.controls['code'].value.toString()
      };

      console.log(addCountryCode)

      response = await this.countryCodeService.Add(addCountryCode);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      setTimeout(() => {
        if ((this.constructor as any).refreshOptionsCallback) {
          (this.constructor as any).refreshOptionsCallback();
          (this.constructor as any).refreshOptionsCallback = null;
        }
        if (this.countryCodeService.Dialog && typeof this.countryCodeService.Dialog.Close === 'function') {
          this.countryCodeService.Dialog.Close();
        }
        this.countryCodeService.SelectedData = null;
      }, 600);
      if (this.countryCodeService.SelectedData == null) {
        this.resetForm();
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
  FillData() {
    let temp = {
      countryAr: this.countryCodeService.SelectedData?.countryCodeTranslation!['ar'].name,
      countryEn: this.countryCodeService.SelectedData?.countryCodeTranslation!['en'].name,
      code: this.countryCodeService.SelectedData?.code ? this.countryCodeService.SelectedData?.code.toString() : ''
    };
    this.dataForm.patchValue(temp);
  }
}
