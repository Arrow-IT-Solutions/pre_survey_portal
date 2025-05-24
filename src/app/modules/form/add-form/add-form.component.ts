import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { FormService } from 'src/app/layout/service/form.service';
import { FormRequest, FormUpdateRequest } from '../form.module';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [MessageService]
})
export class AddFormComponent {
    @Input() prefillValue: { optionEn: string, optionAr: string, uuid?: string } | null = null;
    static refreshOptionsCallback: (() => void) | null = null;

      dataForm!: FormGroup;
      submitted: boolean = false;
      btnLoading: boolean = false;
      loading: boolean = false;
      constructor(public formBuilder:FormBuilder,
        public messageService: MessageService,
        public formService: FormService,
        public layoutService: LayoutService,

      ){
        this.dataForm=this.formBuilder.group({
          formEn:['',Validators.required],
          formAr:['',Validators.required],

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

      if (this.formService.SelectedData != null) {
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

            var formTranslation = [
              {
                name: this.dataForm.controls['formAr'].value == null ? '' : this.dataForm.controls['formAr'].value.toString(),
                language: 'ar'
              },
              {
                name: this.dataForm.controls['formEn'].value == null ? '' : this.dataForm.controls['formEn'].value.toString(),
                language: 'en'
              }
            ];

            if (this.formService.SelectedData != null) {
              // update
              var updateForm: FormUpdateRequest = {
                uuid: this.formService.SelectedData?.uuid?.toString(),
                formTranslations: formTranslation
              };
              console.log(updateForm)
              response = await this.formService.Update(updateForm);
            } else {
              // add
              var addForm: FormRequest = {
                formTranslations: formTranslation
              };

              console.log(addForm)

              response = await this.formService.Add(addForm);
            }

      if (response?.requestStatus?.toString() == '200') {
        this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
        setTimeout(() => {
          if ((this.constructor as any).refreshOptionsCallback) {
            (this.constructor as any).refreshOptionsCallback();
            (this.constructor as any).refreshOptionsCallback = null;
          }
          if (this.formService.Dialog && typeof this.formService.Dialog.Close === 'function') {
            this.formService.Dialog.Close();
          }
          this.formService.SelectedData = null;
        }, 600);
        if (this.formService.SelectedData == null) {
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
        formAr: this.formService.SelectedData?.formTranslations!['ar'].name,
        formEn: this.formService.SelectedData?.formTranslations!['en'].name
      };
      this.dataForm.patchValue(temp);
    }



}
