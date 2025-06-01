import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { QuestionService } from 'src/app/layout/service/question.service';
import { QuestionResponse, QuestionSearchRequest } from '../questions.module';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class QuestionsComponent {
  dataForm!: FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
  data: QuestionResponse[] = [];
  questionTotal: number = 0;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;

  constructor(public formBuilder: FormBuilder, public layoutService: LayoutService, public translate: TranslateService, public questionService: QuestionService, public router: Router, public confirmationService: ConfirmationService, public messageService: MessageService) {
    this.dataForm = this.formBuilder.group({
      question: ['']
    })

    this.questionService.refreshQuestions$.subscribe(() => {
      this.FillData();
    });

  }

  async ngOnInit() {
    await this.FillData();
  }

  openAddQuestion(row: QuestionResponse | null = null) {
    this.questionService.SelectedData = row;
    console.log('selected data : ', this.questionService.SelectedData);
    this.router.navigate(['layout-admin/questions/add-question']);;

  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;
    this.data = [];
    this.questionTotal = 0;
    let filter: QuestionSearchRequest = {
      uuid: '',
      questionText: this.dataForm.controls['question'].value,
      pageIndex: pageIndex.toString(),
      pageSize: this.pageSize.toString(),

    };

    const response = (await this.questionService.Search(filter)) as any;
    console.log('data', response)
    if (response.data == null || response.data.length == 0) {
      this.data = [];
      this.questionTotal = 0;
    } else if (response.data != null && response.data.length != 0) {
      this.data = response.data;
      this.questionTotal = response.data[0];
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

  confirmDelete(row: QuestionResponse) {
    console.log("DELETE")
    this.confirmationService.confirm({
      message: this.translate.instant("Do_you_want_to_delete_this_record?"),
      header: this.translate.instant("Delete_Confirmation"),
      icon: 'pi pi-info-circle',
      key: 'positionDialog',
      closeOnEscape: true,
      accept: async () => {
        const response = (await this.questionService.Delete(row.uuid!)) as any;
        if (response?.requestStatus?.toString() == '200') {
          this.confirmationService.close();
          this.layoutService.showSuccess(this.messageService, 'toast', true, response.requestMessage);
          this.FillData();
        }
        else {
          this.confirmationService.close();
          this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
        }



      },
      reject: () => { },
    });
  }

}
