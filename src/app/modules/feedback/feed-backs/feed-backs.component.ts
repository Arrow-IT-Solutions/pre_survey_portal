import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { FeeddbackService } from 'src/app/Core/services/feeddback.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FeedbackResponse, FeedbackSearchRequest } from '../feedback.module';

@Component({
  selector: 'app-feed-backs',
  templateUrl: './feed-backs.component.html',
  styleUrls: ['./feed-backs.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FeedBacksComponent {
 pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: FeedbackResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  Total: number = 0;
  constructor(public formBuilder: FormBuilder,
    public translate: TranslateService, public layoutService: LayoutService, public feeddbackService: FeeddbackService, public messageService: MessageService, public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      UserName: ['']

    });
  }
  async ngOnInit() {
    await this.FillData();
  }
  Search() {
    this.FillData();

  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.totalRecords = 0;
    // const fromDate = this.dataForm.controls['startDate'].value == '' ? '' : new Date(this.dataForm.controls['startDate'].value.toISOString())
    // const toDate = this.dataForm.controls['endDate'].value == '' ? '' : new Date(this.dataForm.controls['endDate'].value.toISOString())
    let filter: FeedbackSearchRequest = {
      uuid: '',
      value: '',
      name: this.dataForm.controls['UserName'].value,
      includeUser: '0',
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString(),
    };
    const response = (await this.feeddbackService.Search(filter)) as any;
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

  confirmDelete(row: FeedbackResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: this.translate.instant("Do_you_want_to_delete_this_record?"),
      header: this.translate.instant("Delete_Confirmation"),
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.feeddbackService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toast', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }
}
