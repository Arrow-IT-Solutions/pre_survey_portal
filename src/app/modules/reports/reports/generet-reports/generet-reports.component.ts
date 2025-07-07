import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnswerService } from 'src/app/layout/service/answer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AnswerResponse, AnswerReportRequest } from 'src/app/modules/answers/answers.module';

@Component({
  selector: 'app-generet-reports',
  templateUrl: './generet-reports.component.html',
  styleUrls: ['./generet-reports.component.scss'],
  providers: [MessageService]
})
export class GeneretReportsComponent {
  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  data: AnswerResponse[] = [];
  constructor(public formBuilder: FormBuilder,
    public route: Router,
    public messageService: MessageService,
    public answerService: AnswerService,
    public layoutService: LayoutService,

  ) {
    this.dataForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],

    })
  }
  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }
  async onSubmit() {

  }

  async openReportsForPrint() {

    const fromDate = this.dataForm.controls['fromDate'].value == '' ? '' : new Date(this.dataForm.controls['fromDate'].value.toISOString())
    const toDate = this.dataForm.controls['toDate'].value == '' ? '' : new Date(this.dataForm.controls['toDate'].value.toISOString())
    this.loading = true;
    this.data = [];
    let filter: AnswerReportRequest = {
      fromDate: fromDate.toLocaleString(),
      toDate: toDate.toLocaleString(),
      lang: this.layoutService.config.lang.toString(),
      includeCustomer: '1',
      includeQuestion: '1',
      includeOption: '1',
      includeForm: '1'
    };

    const response = (await this.answerService.GetAnswerReport(filter)) as any;
    this.layoutService.DownloadExcel(response, "AnswersReport");

    this.loading = false;

    this.answerService.Dialog.Close();

    //this.route.navigate(['print-reports']);
  }

}
