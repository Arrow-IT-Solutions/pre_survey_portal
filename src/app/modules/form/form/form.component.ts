import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { OptionService } from 'src/app/layout/service/option.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormResponse, FormSearchRequest } from '../form.module';
import { FormService } from 'src/app/layout/service/form.service';
import { AddFormComponent } from '../add-form/add-form.component';
import { SettingsService } from 'src/app/layout/service/settings.service';
import { SettingResponse, SettingSearchRequest } from '../../settings/settings.module';
import { MatDialog } from '@angular/material/dialog';
import { QRCodeDialogComponent } from '../../QR/qrcode-dialog/qrcode-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormComponent {
  dataForm!: FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  data: FormResponse[] = [];
  formTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  appURL: string = '';
  setting: SettingResponse;
  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    public translate: TranslateService,
    public optionService: OptionService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    public formService: FormService,
    public settingService: SettingsService,
    private dialog: MatDialog
  ) {
    this.dataForm = this.formBuilder.group({
      name: [''],

    })

    this.formService.refreshForms$.subscribe(() => {
      this.FillData();
    });
  }

  async ngOnInit() {
    await this.FillData();
    await this.RetriveSettings()
  }

  async RetriveSettings() {


    let filter: SettingSearchRequest = {

      name: '',
      uuid: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.settingService.Search(filter) as any

    this.setting = response.data[0];
    this.appURL = this.setting.appURL;

  }
  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.formTotal = 0;
    let filter: FormSearchRequest = {
      uuid: '',
      name: this.dataForm.controls['name'].value,
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString(),
    };

    const response = (await this.formService.Search(filter)) as any;
    console.log('data', response)
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.formTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.formTotal = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;

  }
  openAddForm(row: FormResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.formService.SelectedData = row
    let content = this.formService.SelectedData == null ? 'Create_Form' : 'Update_Form';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddFormComponent, content);
    this.formService.Dialog = component;
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

  OnChange() {
    if (this.isResetting) { return };

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);
  }

  confirmDelete(row: FormResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: this.translate.instant("Do_you_want_to_delete_this_record?"),
      header: this.translate.instant("Delete_Confirmation"),
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.formService.Delete(row.uuid!)) as any;

        if (response?.requestStatus?.toString() == '200') {
          this.confirmationService.close();
          this.layoutService.showSuccess(this.messageService, 'toast', true, response.requestMessage);
          this.FillData();
        }
        else {
          this.confirmationService.close();
          this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
        }



      },
      reject: () => { },
    });
  }

  CopyLink(row: FormResponse | null = null) {
    if (!row) {
      return;
    }

    const linkToCopy = `${this.appURL}/#/forms/${row.uuid}`;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        console.log('Copied to clipboard:', linkToCopy);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  }

  OpenQRDialog(row: FormResponse) {
    if (!row) {
      return;
    }
    this.formService.SelectedData = row;
    const linkToCopy = `${this.appURL}/#/forms/${row.uuid}`;
    this.dialog.open(QRCodeDialogComponent, {
      data: linkToCopy,
      width: '300px',       // desired width
      maxWidth: '90vw',     // never overflow the viewport
      height: '500px',       // let it grow vertically as needed
      panelClass: 'qr-dialog' // optional: for any extra styling
    });
  }

}
