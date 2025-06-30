import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { OptionResponse, OptionSearchRequest } from '../../options/options.module';
import { OptionService } from 'src/app/layout/service/option.service';
import { AnswerResponse, AnswerSearchRequest } from '../../answers/answers.module';
import { AnswerService } from 'src/app/layout/service/answer.service';

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
    options: OptionResponse[] = [];
    doneTypingInterval = 1000;
    typingTimer: any;
    isResetting: boolean = false;
    Total: number = 0;
    data: OptionResponse[] = [];
    answerTotal: number = 0;
    searchAttempted = false;
  constructor(public formBuilder:FormBuilder,
    public layoutService: LayoutService,
    public optionService: OptionService,
    public answerService: AnswerService,) {
    this.dataForm=this.formBuilder.group({
      option:[''],

    })
  }

  async FillData(pageIndex: number = 0) {
  this.loading = true;
  this.searchAttempted = true;
        this.data = [];
        this.answerTotal = 0;
        let filter: OptionSearchRequest = {
          uuid: this.dataForm.controls['option'].value,
          name: '',
          pageIndex: pageIndex.toString(),
          pageSize: this.pageSize.toString(),
        };

        const response = (await this.optionService.Search(filter)) as any;
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

    async ngOnInit() {

    await this.FillData();
    await this.FillOption();

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

      let filterInput = '';
      if (event != null) {
        filterInput = event.filter
      }

      let filter: OptionSearchRequest = {

        name: filterInput,
        uuid: '',
        pageIndex: "",
        pageSize: '100000'
      }
      const response = await this.optionService.Search(filter) as any

      this.options = response.data
      await this.ReWriteOption();
    }

    ReWriteOption(): any {

      var optionDTO: any[] = []

      this.options.map(option => {
        const translation = option.optionTranslation?.[this.layoutService.config.lang] as any;
        const optionName = translation?.name;

        var obj =
        {
          ...option,
          name: `${optionName}`.trim()

        }

        optionDTO.push(obj)

      })

      this.options = optionDTO;

    }


}
