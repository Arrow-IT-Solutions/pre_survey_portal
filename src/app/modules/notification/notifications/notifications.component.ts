import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { NotificationResponse, NotificationSearchRequest } from '../notification.module';
import { NotificationService } from 'src/app/Core/services/notification.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NotificationsComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: NotificationResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  Total: number = 0;
  Type: any[] = [
    { nameAr: 'فردي', nameEn: 'indivisual', value: 0 },
    { nameAr: 'جماعي', nameEn: 'group', value: 1 }
  ];
  selectedtype: string | null = null;
  typeList: ConstantResponse[] = [];

  constructor(public formBuilder: FormBuilder, public notificationService: NotificationService,
    public translate: TranslateService, public layoutService: LayoutService, public constantService: ConstantService, public messageService: MessageService, public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      UserName: [''],
      Type: ['']

    });
  }
  async ngOnInit() {


    const NotifucationTypeResponse = await this.constantService.Search('NotificationType') as any;
    this.typeList = NotifucationTypeResponse.data;


    await this.FillData();


  }
  Search() {
    this.FillData();
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.totalRecords = 0;
    let filter: NotificationSearchRequest = {
      uuid: '',
      type: this.dataForm.controls['Type'].value == null ? null : this.dataForm.controls['Type'].value.toString(),
      name: this.dataForm.controls['UserName'].value,
      includeUser: '1'
    };
    const response = (await this.notificationService.Search(filter)) as any;
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.totalRecords = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.totalRecords = response.data[0];
    }

    this.totalRecords = response.totalRecords;
    this.loading = false;
  }

  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }
  OnChange() {
    if (this.isResetting) { return }; // Do nothing if resetting

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    this.FillData(event.first)

  }

  openDialog(row: NotificationResponse | null = null) {
    this.notificationService.SelectedData = row;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    let content = this.notificationService.SelectedData == null ? 'Create_Notification' : 'Update_Notification';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddNotificationComponent, content);
    this.notificationService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }

  confirmDelete(row: NotificationResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.notificationService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }

}
