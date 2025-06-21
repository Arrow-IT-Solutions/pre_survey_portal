import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertModelComponent } from '../alert-model/alert-model.component';
import { FeeddbackService } from 'src/app/Core/services/feeddback.service';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { FeedbackRequest } from '../feedBacks.module';
import { SurveyServiceService } from 'src/app/layout/service/survey-service.service';
import { Router } from '@angular/router';
import { SettingResponse, SettingSearchRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [MessageService]
})
export class FeedbackComponent {

  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  dataform!: FormGroup;
  customerIDFK: any;
  settingData: SettingResponse | null = null;
  @ViewChild(AlertModelComponent) alertModal!: AlertModelComponent;


  constructor(public formBuilder: FormBuilder,
    public feedbasckService: FeeddbackService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public surveyService: SurveyServiceService,
    public settingService: SettingsService,
    public route: Router
  ) {
    this.dataform = this.formBuilder.group({
      feedback_note: [''],
      rating: ['4']
    })
  }

  async ngOnInit() {
    this.customerIDFK = this.surveyService.customerUUID;
    await this.GetSettingData();
    console.log('CustomerUUID ', this.customerIDFK)
  }

  ngAfterViewInit() {
    this.alertModal.showAlert(); // عرض مربع الحوار عند تحميل الصفحة
  }

  async onSubmit() {
    try {
      this.btnLoading = true;
      if (this.dataform.invalid) {
        this.submitted = true;
        return;
      }
      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {

    let response;

    // add
    var feedback: FeedbackRequest = {
      note: this.dataform.controls['feedback_note'].value,
      userIDFK: this.customerIDFK.toString(),
      value: this.dataform.controls['rating'].value.toString()

    };

    response = await this.feedbasckService.Add(feedback);


    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.feedbasckService.SelectedData == null) {
        this.resetForm();
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataform.reset();
  }
  selectRating(val: string) {
    this.dataform.get('rating')!.setValue(val);
  }
  openThanksMessage() {
    this.route.navigate(['/thanks']);
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
