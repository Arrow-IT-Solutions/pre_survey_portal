import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingResponse, SettingSearchRequest } from '../../settings/settings.module';
import { SettingsService } from 'src/app/layout/service/settings.service';

@Component({
  selector: 'app-page2-questions',
  templateUrl: './page2-questions.component.html',
  styleUrls: ['./page2-questions.component.scss']
})
export class Page2QuestionsComponent {
  dataForm!:FormGroup;
    currentlang = 'Arabic';
    settingData: SettingResponse | null = null;
    constructor(public formBuilder:FormBuilder,public route:Router,public settingService:SettingsService){
      this.dataForm=this.formBuilder.group({
        answer1:[''],
        answer2:[''],
        answer3:[''],
        answer4:['']
      })
    }
    openFeedback(){
      this.route.navigate(['user-feedback']);
    }

  async ngOnInit() {
    await this.GetSettingData();
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
