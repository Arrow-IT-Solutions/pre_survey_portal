import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddOptionComponent } from '../add-option/add-option.component';
import { OptionResponse, OptionSearchRequest } from '../options.module';
import { OptionService } from 'src/app/layout/service/option.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class OptionsComponent {
  dataForm!: FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  data: OptionResponse[] = [];
  optionTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
constructor(public formBuilder:FormBuilder,
  public layoutService: LayoutService,
  public translate: TranslateService,
  public optionService: OptionService,
  public messageService: MessageService,
  public confirmationService: ConfirmationService
  ){
  this.dataForm=this.formBuilder.group({
    name:[''],

  })

      this.optionService.refreshOptions$.subscribe(() => {
      this.FillData();
    });
}

  async ngOnInit() {
    await this.FillData();
  }

async FillData(pageIndex: number = 0) {
   this.loading = true;
      this.data = [];
      this.optionTotal = 0;
      let filter: OptionSearchRequest = {
        uuid: '',
        name: this.dataForm.controls['name'].value,
        pageIndex: pageIndex.toString(),
        pageSize: this.pageSize.toString(),
      };

      const response = (await this.optionService.Search(filter)) as any;
      console.log('data',response)

      if (response.data == null || response.data.length == 0) {
        this.data = [];
        this.optionTotal = 0;
      } else if (response.data != null && response.data.length != 0) {
        this.data = response.data;
        this.optionTotal = response.data[0];
      }

      this.totalRecords = response.totalRecords;

      this.loading = false;

}
openAddOption(row: OptionResponse | null = null){
    window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
      this.optionService.SelectedData = row
      let content = this.optionService.SelectedData == null ? 'Create_Option' : 'Update_Option';
      this.translate.get(content).subscribe((res: string) => {
        content = res
      });
      var component = this.layoutService.OpenDialog(AddOptionComponent, content);
      this.optionService.Dialog = component;
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

      confirmDelete(row: OptionResponse) {

      console.log(row)
      this.confirmationService.confirm({
        message: this.translate.instant("Do_you_want_to_delete_this_record?"),
        header: this.translate.instant("Delete_Confirmation"),
        icon: 'pi pi-info-circle',
        key: 'positionDialog',
        closeOnEscape: true,
        accept: async () => {
          const response = (await this.optionService.Delete(row.uuid!)) as any;
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
