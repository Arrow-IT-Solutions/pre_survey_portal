import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnswerResponse, AnswerSearchRequest } from '../../answers/answers.module';
import { AnswerService } from 'src/app/layout/service/answer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { GeneretReportsComponent } from './generet-reports/generet-reports.component';
import { ReportResponse } from '../reports.module';
import { Router } from '@angular/router';

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
  data: AnswerResponse[] = [];
  answerTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  constructor(public formBuilder: FormBuilder,
    public route:Router,
    public answerService: AnswerService,
    public layoutService: LayoutService,
    public translate: TranslateService,) {
    this.dataForm = this.formBuilder.group({
      option: [],
      CustomerName: [],
      CustomerPhone: [],
      Form: []
    })

  }
  async ngOnInit() {
    await this.FillData();
  }
  openGenerateReports(row: ReportResponse | null = null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
      this.answerService.SelectedData = row
      let content = this.answerService.SelectedData == null ? 'generateReports' : 'generateReports';
      this.translate.get(content).subscribe((res: string) => {
        content = res
      });
      var component = this.layoutService.OpenDialog(GeneretReportsComponent, content);
      this.answerService.Dialog = component;
      component.OnClose.subscribe(() => {
        document.body.style.overflow = '';
        this.FillData();
      });
  
    }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.answerTotal = 0;
    let filter: AnswerSearchRequest = {
      uuid: '',
      CustomerName: this.dataForm.controls['CustomerName'].value,
      OptionName: this.dataForm.controls['option'].value,
      optionIDFK: '',
      questionIDFK: '',
      customerIDFK: '',
      formIDFK: '',
      formName: this.dataForm.controls['Form'].value,
      phone: this.dataForm.controls['CustomerPhone'].value,
      includeCustomer: '1',
      includeQuestion: '1',
      includeOption: '1',
      includeForm: '1',
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString(),
    };

    const response = (await this.answerService.Search(filter)) as any;
    console.log('data', response)
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.answerTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.answerTotal = response.data[0];
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
  OnChange() {
    if (this.isResetting) { return };

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);
  }

 
}
