import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  dataForm!: FormGroup;
    loading = false;
    pageSize: number = 12;
    first: number = 0;
    totalRecords: number = 0;
    customerTotal: number = 0;
    doneTypingInterval = 1000;
    typingTimer: any;
    isResetting: boolean = false;
  constructor(public formBuilder:FormBuilder,
    public layoutService: LayoutService) {
    this.dataForm=this.formBuilder.group({
    option:[],
    CustomerName:[],
    CustomerPhone:[],
    Form:[]
    })

}
async ngOnInit() {
    await this.FillData();
  }
async FillData(pageIndex: number = 0) {

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
  OnChange(){}
}
