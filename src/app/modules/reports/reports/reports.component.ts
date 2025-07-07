import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnswerResponse, AnswerSearchRequest } from '../../answers/answers.module';
import { AnswerService } from 'src/app/layout/service/answer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TranslateService } from '@ngx-translate/core';

import { GeneretReportsComponent } from './generet-reports/generet-reports.component';
import { ReportResponse } from '../reports.module';
import { Router } from '@angular/router';
import { ConstantResponse } from 'src/app/Core/services/constant.service';
import { ConstantService } from 'src/app/Core/services/constant.service';
import { OptionResponse, OptionSearchRequest } from '../../options/options.module';
import { OptionService } from 'src/app/layout/service/option.service';


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
  options: OptionResponse[] = [];
  answerTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  gender: ConstantResponse[] = [];
  socialStatus: ConstantResponse[] = [];
  constructor(public formBuilder: FormBuilder,
    public route: Router,
    public answerService: AnswerService,
    public layoutService: LayoutService,
    public optionService: OptionService,
    public translate: TranslateService,
    public constantService: ConstantService) {
    this.dataForm = this.formBuilder.group({
      option: [],
      CustomerName: [],
      CustomerPhone: [],
      Form: [''],
      gender: [''],
      socialStatus: [''],
      fromDate: [''],
      toDate: ['',],
    })

  }
  async ngOnInit() {

    try {
      this.loading = true;

      await this.FillOption();
      const SocialStatusResponse = await this.constantService.Search('SocialStatus', 1) as any;
      this.socialStatus = SocialStatusResponse.data;

      const GenderResponse = await this.constantService.Search('Gender', 1) as any;
      this.gender = GenderResponse.data;

      await this.FillData();
    }
    catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }

  }
  async openGenerateReports(row: ReportResponse | null = null) {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    // document.body.style.overflow = 'hidden';
    // this.answerService.SelectedData = row
    // let content = this.answerService.SelectedData == null ? 'generateReports' : 'generateReports';
    // this.translate.get(content).subscribe((res: string) => {
    //   content = res
    // });
    // var component = this.layoutService.OpenDialog(GeneretReportsComponent, content);
    // this.answerService.Dialog = component;
    // component.OnClose.subscribe(() => {
    //   document.body.style.overflow = '';
    //   this.FillData();
    // });

    const fromDate = this.dataForm.controls['fromDate'].value == '' ? '' : new Date(this.dataForm.controls['fromDate'].value.toISOString())
    const toDate = this.dataForm.controls['toDate'].value == '' ? '' : new Date(this.dataForm.controls['toDate'].value.toISOString())
    let filter: AnswerSearchRequest = {
      uuid: '',
      CustomerName: this.dataForm.controls['CustomerName'].value,
      OptionName: '',
      optionIDFK: this.dataForm.controls['option'].value,
      questionIDFK: '',
      customerIDFK: '',
      formIDFK: '',
      formName: this.dataForm.controls['Form'].value,
      phone: this.dataForm.controls['CustomerPhone'].value,
      fromDate: fromDate.toLocaleString(),
      toDate: toDate.toLocaleString(),
      gender: this.dataForm.controls['gender'].value.toString(),
      martialStatus: this.dataForm.controls['socialStatus'].value.toString(),
      lang: this.layoutService.config.lang,
      includeCustomer: '1',
      includeQuestion: '1',
      includeOption: '1',
      includeForm: '1',
    };

    const response = (await this.answerService.GetAnswerReport(filter)) as any;
    this.layoutService.DownloadExcel(response, "AnswersReport");

  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    const fromDate = this.dataForm.controls['fromDate'].value == '' ? '' : new Date(this.dataForm.controls['fromDate'].value.toISOString())
    const toDate = this.dataForm.controls['toDate'].value == '' ? '' : new Date(this.dataForm.controls['toDate'].value.toISOString())
    this.data = [];
    this.answerTotal = 0;
    let filter: AnswerSearchRequest = {
      uuid: '',
      CustomerName: this.dataForm.controls['CustomerName'].value,
      OptionName: '',
      optionIDFK: this.dataForm.controls['option'].value,
      questionIDFK: '',
      customerIDFK: '',
      formIDFK: '',
      formName: this.dataForm.controls['Form'].value,
      phone: this.dataForm.controls['CustomerPhone'].value,
      fromDate: fromDate.toLocaleString(),
      toDate: toDate.toLocaleString(),
      gender: this.dataForm.controls['gender'].value.toString(),
      martialStatus: this.dataForm.controls['socialStatus'].value.toString(),
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

  async FillOption(event: any = null) {

    var optionID: any;

    let filter: OptionSearchRequest = {

      name: '',
      uuid: optionID,
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.optionService.Search(filter) as any

    this.options = response.data,

      await this.ReWriteOption();
  }

  ReWriteOption(): any {

    var authorDTO: any[] = []

    this.options.map(option => {
      const translation = option.optionTranslation?.[this.layoutService.config.lang] as any;
      const optionName = translation?.name;

      var obj =
      {
        ...option,
        name: `${optionName}`.trim()

      }

      authorDTO.push(obj)

    })

    this.options = authorDTO;

  }

}
