import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/layout/service/customer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { CustomerResponse } from '../customers.module';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [MessageService]
})
export class CustomersComponent {
   dataForm!: FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
constructor(public formBuilder:FormBuilder,public layoutService: LayoutService,public CustomerService:CustomerService,public translate: TranslateService,){
  this.dataForm=this.formBuilder.group({
    name:[''],
    phone:['']
  })
}
openAddCustomer(row: CustomerResponse | null = null){
  window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.CustomerService.SelectedData = row
    let content = this.CustomerService.SelectedData == null ? 'Create_Customer' : 'Update_Customer';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddCustomerComponent, content);
    this.CustomerService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });

}
async FillData(pageIndex: number = 0) {

}

  async resetform() {
   
  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    

  }

}
