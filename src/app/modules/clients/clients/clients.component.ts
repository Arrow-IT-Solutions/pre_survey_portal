import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientSearchRequest, ClientsResponse } from '../clients.module';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { ClientsService } from 'src/app/Core/services/clients.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class ClientsComponent {
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  dataForm!: FormGroup;
  loading = false;
  data: ClientsResponse[] = [];
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  ClientTotal: number = 0;
  link = '';
  visible: boolean = false;

  constructor(public formBuilder: FormBuilder, public clientService: ClientsService,
    public translate: TranslateService, public layoutService: LayoutService, public messageService: MessageService, public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      clientName: [''],
      phone: [''],
      id: [''],
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
    this.ClientTotal = 0;
    let filter: ClientSearchRequest = {
      name: this.dataForm.controls['clientName'].value,
      phone: this.dataForm.controls['phone'].value,
      includeUser: '1',
      pageIndex: pageIndex.toString()
    };
    const response = (await this.clientService.Search(filter)) as any;
    console.log(response)
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.ClientTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.ClientTotal = response.data[0];
    }

    this.totalRecords = response.totalRecords;

    this.loading = false;
  }

  openDialog(row: ClientsResponse | null = null) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';
    this.clientService.SelectedData = row
    let content = this.clientService.SelectedData == null ? 'Create_Client' : 'Update_Client';
    this.translate.get(content).subscribe((res: string) => {
      content = res
    });
    var component = this.layoutService.OpenDialog(AddClientComponent, content);
    this.clientService.Dialog = component;
    component.OnClose.subscribe(() => {
      document.body.style.overflow = '';
      this.FillData();
    });
  }
  confirmDelete(row: ClientsResponse) {

    console.log(row)
    this.confirmationService.confirm({
      message: "Do_you_want_to_delete_this_record?",
      header: "Delete_Confirmation",
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.clientService.Delete(row.uuid!)) as any;

        this.confirmationService.close();

        this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

        this.FillData();

      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }




  getFirstChar() { }


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

  showDialog(link: string) {
    this.link = link;
    this.visible = true;
  }

}
