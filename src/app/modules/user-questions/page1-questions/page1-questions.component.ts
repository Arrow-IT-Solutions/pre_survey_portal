import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { SurveyServiceService } from 'src/app/layout/service/survey-service.service';
import { SubmitAnswersRequest, SurveySession } from '../../SurveySession/survey-session/survey-session.module';
import { QuestionService } from 'src/app/layout/service/question.service';
import { QuestionResponse, QuestionSearchRequest } from '../../questions/questions.module';
import { FormResponse, FormSearchRequest } from '../../form/form.module';
import { FormService } from 'src/app/layout/service/form.service';
import { AnswerPair } from '../../SurveySession/survey-session/survey-session.module';
import { SettingResponse, SettingSearchRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';
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
  settingData: SettingResponse | null = null;
  formUuid: string;
  constructor(public formBuilder: FormBuilder,
    public layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    public route: ActivatedRoute,
    public surveyService: SurveyServiceService,
    public formService: FormService,
    public settingService: SettingsService) {
  }

  async ngOnInit() {
    this.session = this.surveyService.getSession();
    this.checkCurrentLang();
    this.session = this.surveyService.getSession();
    if (!this.session.answers) {
      this.session.answers = [];
    }
    await this.RetriveQuestions();
    await this.GetSettingData();
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

  async openPage2() {

    const missing = this.displayedQuestions
      .filter(q => q.uuid)
      .find(q => !this.dataForm.value[q.uuid!]);
    if (missing) {
      this.pageError = true;
      return;
    }
    this.pageError = false;

    this.session.answers = this.session.answers || [];
    this.displayedQuestions.forEach(q => {
      if (!q.uuid) return;
      const selectedOpt = this.dataForm.value[q.uuid];
      const idx = this.session.answers!.findIndex(p => p.questionUUID === q.uuid);

      if (idx > -1) {
        this.session.answers![idx].optionUUID = selectedOpt;
      } else {
        this.session.answers!.push({
          questionUUID: q.uuid,
          optionUUID: selectedOpt
        });
      }
    });

    this.pageIndex++;
    if (this.pageIndex * this.pageSize >= this.questions.length) {
      const payload: SubmitAnswersRequest = {
        formUUID: this.session.formUuid!,
        answers: this.session.answers || [],
        customer: this.session.customer,
      };

      console.log(payload)
      let response
      response = await this.surveyService.Add(payload);

      console.log(response)

      this.surveyService.customerUUID = response.customerUUID;

      this.router.navigate(['user-feedback']);
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
  async GetSettingData(pageIndex: number = 0) {

    this.settingData = null;

    let filter: SettingSearchRequest = {
      uuid: '',
      name: '',
    };

    const response = (await this.settingService.Search(filter)) as any;

    if (response.data == null || response.data.length == 0) {
      this.settingData = null;
    } else if (response.data != null && response.data.length != 0) {
      this.settingData = response.data[0];
      console.log(this.settingData)
    }

  }
}
