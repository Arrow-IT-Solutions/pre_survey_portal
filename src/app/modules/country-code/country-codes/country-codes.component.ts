import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { OptionService } from 'src/app/layout/service/option.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OptionResponse, OptionSearchRequest } from '../../options/options.module';
import { AddOptionComponent } from '../../options/add-option/add-option.component';
import { CountryCodeResponse, CountryCodeSearchRequest } from '../country-code.module';
import { CountryCodeService } from 'src/app/Core/services/country-code.service';
import { AddCountryCodeComponent } from '../add-country-code/add-country-code.component';

@Component({
  selector: 'app-country-codes',
  templateUrl: './country-codes.component.html',
  styleUrls: ['./country-codes.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CountryCodesComponent {
 dataForm!: FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  data: CountryCodeResponse[] = [];
  countryCodeTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
constructor(public formBuilder:FormBuilder,
  public layoutService: LayoutService,
  public translate: TranslateService,
  public messageService: MessageService,
  public confirmationService: ConfirmationService,
  public countryCodeService:CountryCodeService
  ){
  this.dataForm=this.formBuilder.group({
    name:[''],
    code:['']

  })

      this.countryCodeService.refreshCountryCodes$.subscribe(() => {
      this.FillData();
    });
}

  async ngOnInit() {
    await this.FillData();
  }

async FillData(pageIndex: number = 0) {
   this.loading = true;
      this.data = [];
      this.countryCodeTotal = 0;
      let filter: CountryCodeSearchRequest = {
        uuid: '',
        name: this.dataForm.controls['name'].value,
        code: this.dataForm.controls['code'].value,
        pageIndex: pageIndex.toString(),
        pageSize: this.pageSize.toString(),
      };

      const response = (await this.countryCodeService.Search(filter)) as any;
      console.log('data',response)

      if (response.data == null || response.data.length == 0) {
        this.data = [];
        this.countryCodeTotal = 0;
      } else if (response.data != null && response.data.length != 0) {
        this.data = response.data;
        this.countryCodeTotal = response.data[0];
      }

      this.totalRecords = response.totalRecords;

      this.loading = false;

}
openAddCountryCode(row: CountryCodeResponse | null = null){
    window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
      this.countryCodeService.SelectedData = row
      let content = this.countryCodeService.SelectedData == null ? 'Create_CountryCode' : 'Update_CountryCode';
      this.translate.get(content).subscribe((res: string) => {
        content = res
      });
      var component = this.layoutService.OpenDialog(AddCountryCodeComponent, content);
      this.countryCodeService.Dialog = component;
      component.OnClose.subscribe(() => {
        document.body.style.overflow = '';
        this.FillData();
      });

}

  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first);

  }

 OnChange()
  {
    if (this.isResetting) { return };

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);
  }

      confirmDelete(row: CountryCodeResponse) {

      console.log(row)
      this.confirmationService.confirm({
        message: this.translate.instant("Do_you_want_to_delete_this_record?"),
        header: this.translate.instant("Delete_Confirmation"),
        icon: 'pi pi-info-circle',
        key: 'positionDialog',
        closeOnEscape: true,
        accept: async () => {
          const response = (await this.countryCodeService.Delete(row.uuid!)) as any;
          if (response?.requestStatus?.toString() == '200'){
          this.confirmationService.close();
          this.layoutService.showSuccess(this.messageService, 'toast', true, response.requestMessage);
          this.FillData();
          }
          else {
          this.confirmationService.close();
          this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
          }

        },
        reject: () => {},
      });
    }
}
