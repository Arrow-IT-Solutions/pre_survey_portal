import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/Core/services/notification.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { UserSearchRequest, UserResponse } from '../../auth/auth.module';
import { UserService } from 'src/app/Core/services/user.service';
import { NotificationRequest, NotificationUpdateRequest } from '../notification.module';



@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
  providers: [MessageService]
})

export class AddNotificationComponent {
  dataForm!: FormGroup;
  typeList: ConstantResponse[] = [];
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  clients: UserResponse[] = [];

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public notification: NotificationService, public constantService: ConstantService, public userService: UserService, public notificationService: NotificationService, public messageService: MessageService) {
    this.dataForm = formBuilder.group({
      Type: ['', Validators.required],
      UserName: [''],
      notes: ['', Validators.required],
      title: ['', Validators.required]

    })
  }
  async ngOnInit() {
    try {
      this.loading = true;
      await this.RetriveClient();
      const NotifucationTypeResponse = await this.constantService.Search('NotificationType') as any;
      this.typeList = NotifucationTypeResponse.data;

      this.resetForm();

      if (this.notificationService.SelectedData != null) {
        console.log(this.notificationService.SelectedData)
        await this.FillData();
      }
    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }
  async RetriveClient() {

    var clientID: any;

    if (this.notificationService.SelectedData != null) {
      clientID = this.notificationService.SelectedData.user?.uuid
    }
    else {
      if (this.notificationService.SelectedData != null) {
        //clientID = this.paymentService.SelectedData?.driver?.uuid,
      }
    }


    let filter: UserSearchRequest = {

      name: '',
      uuid: clientID,
      userType: "2",
      userStatus: '',
      includeFeedback: '0',
      includeNotifications: '0',
      includeRole: '0',
      isTermsApproved: '',
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.userService.Search(filter) as any

    this.clients = response.data,

      await this.ReWriteClient();

  }
  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
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

    if (this.notificationService.SelectedData != null) {
      // update

      var notification: NotificationUpdateRequest = {
        uuid: this.notificationService.SelectedData?.uuid?.toString(),
        note: this.dataForm.controls['notes'].value,
        notificationType: this.dataForm.controls['Type'].value.toString(),
        title: this.dataForm.controls['title'].value,

      };

      response = await this.notificationService.Update(notification);
    } else {
      // add
      var addnotification: NotificationRequest = {
        note: this.dataForm.controls['notes'].value,
        userIDFK: this.dataForm.controls['UserName'].value == null ? null : this.dataForm.controls['UserName'].value.toString(),
        notificationType: this.dataForm.controls['Type'].value.toString(),
        title: this.dataForm.controls['title'].value,
      };

      console.log(addnotification)

      response = await this.notificationService.Add(addnotification);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.notificationService.SelectedData == null) {
        this.resetForm();
      } else {
        this.notificationService.Dialog.close();
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

  async FillData() {
    let temp = {
      Type: Number(this.notificationService.SelectedData?.NotificationType),
      UserName: this.notificationService.SelectedData?.user.uuid,
      notes: this.notificationService.SelectedData?.note,
    };
    this.dataForm.patchValue(temp);

  }

  ReWriteClient(): any {

    var clientDTO: any[] = []

    this.clients.map(client => {
      const translation = client.userTranslation?.[this.layoutService.config.lang] as any;
      const firstName = translation?.firstName;
      const lastName = translation?.lastName;

      var obj =
      {
        ...client,
        fullName: `${firstName} ${lastName}`.trim()

      }

      clientDTO.push(obj)

    })

    this.clients = clientDTO;

  }

  async FillClient(event: any = null) {

    let filterInput = '';
    if (event != null) {
      filterInput = event.filter
    }

    let filter: UserSearchRequest = {

      name: filterInput,
      uuid: '',
      userType: "2",
      userStatus: '',
      includeFeedback: '0',
      includeNotifications: '0',
      includeRole: '0',
      isTermsApproved: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.userService.Search(filter) as any

    this.clients = response.data
    await this.ReWriteClient();
  }


}
