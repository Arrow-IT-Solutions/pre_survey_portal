import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnswerResponse, AnswerSearchRequest } from '../answers.module';
import { AnswerService } from 'src/app/layout/service/answer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent {
   dataForm!: FormGroup;
    loading = false;
    pageSize: number = 12;
    first: number = 0;
    totalRecords: number = 0;
    data: AnswerResponse[] = [];
    answerTotal: number = 0;
    doneTypingInterval = 1000;
    typingTimer: any;
    isResetting: boolean = false;

    constructor(public formBuilder:FormBuilder,
      public answerService: AnswerService,
      public layoutService: LayoutService,
      public translate: TranslateService,
    ){
      this.dataForm=this.formBuilder.group({
        customerName:[''],
        answer:['']
      })

    }

      async ngOnInit() {
    await this.FillData();
  }

  async FillData(pageIndex: number = 0) {
        this.loading = true;
        this.data = [];
        this.answerTotal = 0;
        let filter: AnswerSearchRequest = {
          uuid: '',
          CustomerName: this.dataForm.controls['customerName'].value,
          OptionName: this.dataForm.controls['answer'].value,
          optionIDFK: '',
          questionIDFK: '',
          customerIDFK: '',
          includeCustomer: '1',
          includeQuestion: '1',
          includeOption: '1',
        };

        const response = (await this.answerService.Search(filter)) as any;
        console.log('data',response)
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

    paginate(event: any) {
      this.pageSize = event.rows
      this.first = event.first


    }

   async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }

 OnChange()
  {
    if (this.isResetting) { return };

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);
  }

}
