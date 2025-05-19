import { Component } from '@angular/core';
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
            if (this.optionService.SelectedData == null) {
              this.resetForm();
                setTimeout(() => {
                this.optionService.Dialog.adHostChild.viewContainerRef.clear();
                this.optionService.Dialog.adHostDynamic.viewContainerRef.clear();
                this.optionService.triggerRefreshOptions();
              }, 600);
            } else {
              setTimeout(() => {
                this.optionService.Dialog.adHostChild.viewContainerRef.clear();
                this.optionService.Dialog.adHostDynamic.viewContainerRef.clear();
                this.optionService.triggerRefreshOptions();
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
    FillData(){
    let temp = {
      optionAr: this.optionService.SelectedData?.optionTranslation!['ar'].name,
      optionEn: this.optionService.SelectedData?.optionTranslation!['en'].name
    };
    this.dataForm.patchValue(temp);
  }
}
