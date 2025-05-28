import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { SurveyServiceService } from 'src/app/layout/service/survey-service.service';
import { SurveySession } from '../../SurveySession/survey-session/survey-session.module';
import { QuestionService } from 'src/app/layout/service/question.service';
import { QuestionResponse, QuestionSearchRequest } from '../../questions/questions.module';
import { FormResponse, FormSearchRequest } from '../../form/form.module';
import { FormService } from 'src/app/layout/service/form.service';

@Component({
  selector: 'app-page1-questions',
  templateUrl: './page1-questions.component.html',
  styleUrls: ['./page1-questions.component.scss']
})
export class Page1QuestionsComponent {
  dataForm!: FormGroup;
  session!: SurveySession;
  currentlang = 'Arabic';
  pageIndex = 0;
  forms: FormResponse[] = [];
  questions: QuestionResponse[] = [];
  displayedQuestions: QuestionResponse[] = [];
  readonly pageSize = 4;
  pageError = false;

  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    public route: Router,
    public surveyService: SurveyServiceService,
    public formService: FormService) {
  }

  async ngOnInit() {
    console.log('OnInit')
    this.checkCurrentLang();

    this.session = this.surveyService.getSession();
    if (!this.session.answers) {
      this.session.answers = {};
    }
    await this.RetriveQuestions();
    this.pageIndex = 0;
    this.loadPageForm();
  }

  changeLang(lang: string) {
    console.log("current Lang : ", lang);

    if (lang == 'en') {
      this.currentlang = "English"
      this.layoutService.config =
      {
        dir: 'ltr',
        lang: 'en'
      }

    }
    else if (lang == 'ar') {
      this.currentlang = "عربي"
      this.layoutService.config =
      {
        dir: 'rtl',
        lang: 'ar'
      }
    }

    localStorage.setItem('lang', this.layoutService.config.lang);
    localStorage.setItem('dir', this.layoutService.config.dir);
    this.document.documentElement.lang = this.layoutService.config.lang;

    window.location.reload();
  }

  async RetriveQuestions() {

    let filter: FormSearchRequest = {

      name: '',
      uuid: this.session.formUuid,
      pageSize: '10000'

    }
    const response = await this.formService.Search(filter) as any

    this.forms = response.data;
    this.questions = this.forms.length
      ? this.forms[0].questions ?? []
      : [];

    console.log('Questions', this.questions)

  }

  checkCurrentLang() {
    if (this.layoutService.config.lang == 'en') {
      this.currentlang = "English"


    }
    else if (this.layoutService.config.lang == 'ar') {
      this.currentlang = "عربي"

    }
  }

  openPage2() {

    const missing = this.displayedQuestions
      .filter(q => q.uuid)
      .find(q => !this.dataForm.value[q.uuid!]);
    if (missing) {
      this.pageError = true;
      return;
    }
    this.pageError = false;

    this.displayedQuestions.forEach(q => {
      if (q.uuid) {
        this.session.answers![q.uuid] = this.dataForm.value[q.uuid];
      }
    });

    this.pageIndex++;
    if (this.pageIndex * this.pageSize >= this.questions.length) {
      this.route.navigate(['user-feedback']);
    } else {
      this.loadPageForm();
    }
  }

  private loadPageForm() {

    const start = this.pageIndex * this.pageSize;
    this.displayedQuestions = this.questions.slice(start, start + this.pageSize);

    const group: { [key: string]: any } = {};
    this.displayedQuestions.forEach(q => {
      if (q.uuid) {
        group[q.uuid] = [''];
      }
    });
    this.dataForm = this.formBuilder.group(group);
  }

}
