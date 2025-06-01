import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConstantResponse, ConstantService } from 'src/app/Core/services/constant.service';
import { CustomerService } from 'src/app/layout/service/customer.service';
import { CustomerRequest, CustomerUpdateRequest } from '../customers.module';
import { LayoutService } from 'src/app/layout/service/layout.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  providers: [MessageService]
})
export class AddCustomerComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  customerSocialStatus: ConstantResponse[] = [];
  constructor(public formBuilder: FormBuilder,
    public messageService: MessageService,
    public constantService: ConstantService,
    public customerService: CustomerService,
    public layoutService: LayoutService,
  ) {
    this.dataForm = this.formBuilder.group({
      fullNameAr: ['', Validators.required],
      fullNameEn: ['', Validators.required],
      SocialStatus: ['', Validators.required],
      birthDate: ['', Validators.required],
      state: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      KnowingUs: ['', Validators.required],
      sendOffers: ['No', Validators.required]
    })
  }
  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  async ngOnInit() {
    try {
      this.loading = true;
      const SocialStatusResponse = await this.constantService.Search('SocialStatus', 0) as any;
      this.customerSocialStatus = SocialStatusResponse.data;
      console.log('SocialStatusResponse ', SocialStatusResponse);
      if (this.customerService.SelectedData != null) {
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
    let birthDate = new Date(this.dataForm.controls['birthDate'].value)

    var customerTranslation = [
      {
        fullName: this.dataForm.controls['fullNameAr'].value == null ? '' : this.dataForm.controls['fullNameAr'].value.toString(),
        language: 'ar'
      },
      {
        fullName: this.dataForm.controls['fullNameEn'].value == null ? '' : this.dataForm.controls['fullNameEn'].value.toString(),
        language: 'en'
      }
    ];

    if (this.customerService.SelectedData != null) {
      // update
      var updateCustomer: CustomerUpdateRequest = {
        uuid: this.customerService.SelectedData?.uuid?.toString(),
        customerTranslation: customerTranslation,
        birthDate: birthDate.toISOString(),
        socialStatus: this.dataForm.controls['SocialStatus'].value == null ? null : this.dataForm.controls['SocialStatus'].value.toString(),
        state: this.dataForm.controls['state'].value == null ? null : this.dataForm.controls['state'].value.toString(),
        email: this.dataForm.controls['email'].value == null ? null : this.dataForm.controls['email'].value.toString(),
        phone: this.dataForm.controls['phone'].value == null ? null : this.dataForm.controls['phone'].value.toString(),
        knowingUs: this.dataForm.controls['KnowingUs'].value == null ? null : this.dataForm.controls['KnowingUs'].value.toString(),
        isAgree: this.dataForm.controls['sendOffers'].value.toString() == 'Yes' ? 'True' : 'False'
      };
      console.log(updateCustomer)
      response = await this.customerService.Update(updateCustomer);
    } else {
      // add
      var addCustomer: CustomerRequest = {
        customerTranslation: customerTranslation,
        birthDate: birthDate.toISOString(),
        socialStatus: this.dataForm.controls['SocialStatus'].value == null ? null : this.dataForm.controls['SocialStatus'].value.toString(),
        state: this.dataForm.controls['state'].value == null ? null : this.dataForm.controls['state'].value.toString(),
        email: this.dataForm.controls['email'].value == null ? null : this.dataForm.controls['email'].value.toString(),
        phone: this.dataForm.controls['phone'].value == null ? null : this.dataForm.controls['phone'].value.toString(),
        knowingUs: this.dataForm.controls['KnowingUs'].value == null ? null : this.dataForm.controls['KnowingUs'].value.toString(),
        isAgree: this.dataForm.controls['sendOffers'].value.toString() == 'Yes' ? 'True' : 'False'
      };

      console.log('addCustomer ', addCustomer)

      response = await this.customerService.Add(addCustomer);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.customerService.SelectedData == null) {
        this.resetForm();
        setTimeout(() => {
          this.customerService.Dialog.adHostChild.viewContainerRef.clear();
          this.customerService.Dialog.adHostDynamic.viewContainerRef.clear();
          this.customerService.triggerRefreshCustomers();
        }, 600);
      } else {
        setTimeout(() => {
          this.customerService.Dialog.adHostChild.viewContainerRef.clear();
          this.customerService.Dialog.adHostDynamic.viewContainerRef.clear();
          this.customerService.triggerRefreshCustomers();
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

  FillData() {
    let temp = {
      fullNameAr: this.customerService.SelectedData?.customerTranslation!['ar'].fullName,
      fullNameEn: this.customerService.SelectedData?.customerTranslation!['en'].fullName,
      SocialStatus: Number(this.customerService.SelectedData?.socialStatus),
      birthDate: this.customerService.SelectedData?.birthDate,
      state: this.customerService.SelectedData?.state,
      email: this.customerService.SelectedData?.email,
      phone: this.customerService.SelectedData?.phone,
      KnowingUs: this.customerService.SelectedData?.knowingUs,
      sendOffers: this.customerService.SelectedData?.isAgree == 'True' ? 'Yes' : 'No'
    };
    this.dataForm.patchValue(temp);
  }
}
