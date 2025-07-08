import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyServiceService } from 'src/app/layout/service/survey-service.service';
import { SettingResponse, SettingSearchRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';

@Component({
  selector: 'app-thank-page',
  templateUrl: './thank-page.component.html',
  styleUrls: ['./thank-page.component.scss']
})


export class ThankPageComponent {
  settingData: SettingResponse | null = null;
  constructor(public route: Router,
    public surveyService: SurveyServiceService,
    public settingService: SettingsService,
  ) { }
  isVisible: boolean = true;

  async ngOnInit() {
    await this.GetSettingData();

    console.log('sersess', this.surveyService.getSession())
  }

  showAlert() {
    this.isVisible = true;
  }

  closeAlert() {
    this.isVisible = false;


  }
  goBackHome() {
    this.route.navigateByUrl(`/forms/${this.surveyService.getSession().formUuid}`);

    this.surveyService.clearSession();
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
