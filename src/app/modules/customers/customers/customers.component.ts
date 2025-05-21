import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/layout/service/customer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CustomerResponse, CustomerSearchRequest } from '../customers.module';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class CustomersComponent {
  dataForm!: FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  data: CustomerResponse[] = [];
  customerTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
constructor(public formBuilder:FormBuilder,
  public layoutService: LayoutService,
  public customerService:CustomerService,
  public translate: TranslateService,
  public messageService: MessageService,
  public confirmationService: ConfirmationService) {
  this.dataForm=this.formBuilder.group({
    name:[''],
    phone:['']
  })

      this.customerService.refreshCustomers$.subscribe(() => {
      this.FillData();
    });
}

  async ngOnInit() {
    await this.FillData();
  }

openAddCustomer(row: CustomerResponse | null = null){
  window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.customerService.SelectedData = row
    let content = this.customerService.SelectedData == null ? 'Create_Customer' : 'Update_Customer';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddCustomerComponent, content);
    this.customerService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });

}
async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.customerTotal = 0;
    let filter: CustomerSearchRequest = {
      uuid: '',
      fullName: this.dataForm.controls['name'].value,
      phone: this.dataForm.controls['phone'].value,
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString(),

    };

    const response = (await this.customerService.Search(filter)) as any;
    console.log('data',response)
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.customerTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.customerTotal = response.data[0];
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

    confirmDelete(row: CustomerResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: this.translate.instant("Do_you_want_to_delete_this_record?"),
      header: this.translate.instant("Delete_Confirmation"),
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.customerService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {},
    });
  }

}
