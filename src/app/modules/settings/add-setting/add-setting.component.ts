import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { SettingRequest, SettingUpdateRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';

@Component({
  selector: 'app-add-setting',
  templateUrl: './add-setting.component.html',
  styleUrls: ['./add-setting.component.scss'],
  providers: [MessageService]
})
export class AddSettingComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  file: any;
  fileInput: any
  img: boolean = true;
  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public settingService: SettingsService,
    public messageService: MessageService
  ) {
    this.dataForm = this.formBuilder.group({
      location: [''],
      phone: [''],
      email: [''],
      nameAr: [''],
      nameEn: [''],

    })

  }
  async ngOnInit() {
    try {
      this.loading = true;

      if (this.settingService.SelectedData != null) {
        console.log(this.settingService.SelectedData)
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

    var settingTranslation = [
      {
        name: this.dataForm.controls['nameAr'].value.toString(),
        language: 'ar'
      },
      {
        name: this.dataForm.controls['nameEn'].value == null ? '' : this.dataForm.controls['nameEn'].value.toString(),
        language: 'en'
      }
    ];

    if (this.settingService.SelectedData != null) {
      // update

      var setting: SettingUpdateRequest = {
        uuid: this.settingService.SelectedData?.uuid?.toString(),
        appURL: this.dataForm.controls['location'].value.toString(),
        settingTranslation: settingTranslation,
        phone: this.dataForm.controls['phone'].value.toString(),
        email: this.dataForm.controls['email'].value.toString(),

      };

      response = await this.settingService.Update(setting);
    } else {
      // add
      var addsetting: SettingRequest = {
        settingTranslation: settingTranslation,
        appURL: this.dataForm.controls['location'].value.toString(),
        phone: this.dataForm.controls['phone'].value.toString(),
        email: this.dataForm.controls['email'].value.toString(),
      };

      console.log('add', addsetting)

      response = await this.settingService.Add(addsetting);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);

      if (this.settingService.SelectedData == null) {
        this.resetForm();

      } else {
        this.settingService.Dialog.Close();
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  async FillData() {
    let temp = {
      location: this.settingService.SelectedData?.appURL,
      phone: this.settingService.SelectedData?.phone,
      email: this.settingService.SelectedData?.email,
      nameAr: this.settingService.SelectedData?.settingTranslation!['ar'].name,
      nameEn: this.settingService.SelectedData?.settingTranslation!['en'].name,
    };
    this.dataForm.patchValue(temp);

  }

  resetForm() {
    this.dataForm.reset();
  }
}
