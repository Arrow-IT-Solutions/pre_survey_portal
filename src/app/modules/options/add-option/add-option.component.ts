import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OptionService } from 'src/app/layout/service/option.service';
import { OptionRequest, OptionUpdateRequest } from '../options.module';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss'],
  providers: [MessageService]
})
export class AddOptionComponent {
  @Input() prefillValue: { optionEn: string, optionAr: string, uuid?: string } | null = null;
  static refreshOptionsCallback: (() => void) | null = null;

    dataForm!: FormGroup;
    submitted: boolean = false;
    btnLoading: boolean = false;
    loading: boolean = false;
    constructor(public formBuilder:FormBuilder,
      public messageService: MessageService,
      public optionService: OptionService,
      public layoutService: LayoutService,
    ){
      this.dataForm=this.formBuilder.group({
        optionEn:['',Validators.required],
        optionAr:['',Validators.required],

      })
    }
    get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

async ngOnInit() {
  try {
    this.loading = true;

    if (!this.prefillValue && (this.constructor as any).prefillValue) {
      this.prefillValue = (this.constructor as any).prefillValue;
      (this.constructor as any).prefillValue = null;
    }
    if (this.prefillValue) {
      if (this.prefillValue.optionEn !== undefined) {
        this.dataForm.controls['optionEn'].setValue(this.prefillValue.optionEn);
      }
      if (this.prefillValue.optionAr !== undefined) {
        this.dataForm.controls['optionAr'].setValue(this.prefillValue.optionAr);
      }
    }

    if (this.optionService.SelectedData != null) {
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

          var optionTranslation = [
            {
              name: this.dataForm.controls['optionAr'].value == null ? '' : this.dataForm.controls['optionAr'].value.toString(),
              language: 'ar'
            },
            {
              name: this.dataForm.controls['optionEn'].value == null ? '' : this.dataForm.controls['optionEn'].value.toString(),
              language: 'en'
            }
          ];

          if (this.optionService.SelectedData != null) {
            // update
            var updateOption: OptionUpdateRequest = {
              uuid: this.optionService.SelectedData?.uuid?.toString(),
              optionTranslation: optionTranslation
            };
            console.log(updateOption)
            response = await this.optionService.Update(updateOption);
          } else {
            // add
            var addOption: OptionRequest = {
              optionTranslation: optionTranslation
            };

            console.log(addOption)

            response = await this.optionService.Add(addOption);
          }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      setTimeout(() => {
        if ((this.constructor as any).refreshOptionsCallback) {
          (this.constructor as any).refreshOptionsCallback();
          (this.constructor as any).refreshOptionsCallback = null; 
        }
        if (this.optionService.Dialog && typeof this.optionService.Dialog.Close === 'function') {
          this.optionService.Dialog.Close();
        }
        this.optionService.SelectedData = null;
      }, 600);
      if (this.optionService.SelectedData == null) {
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
    FillData(){
    let temp = {
      optionAr: this.optionService.SelectedData?.optionTranslation!['ar'].name,
      optionEn: this.optionService.SelectedData?.optionTranslation!['en'].name
    };
    this.dataForm.patchValue(temp);
  }
}
