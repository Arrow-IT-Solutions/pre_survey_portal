import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyServiceService } from 'src/app/layout/service/survey-service.service';
@Component({
  selector: 'app-thank-page',
  templateUrl: './thank-page.component.html',
  styleUrls: ['./thank-page.component.scss']
})


export class ThankPageComponent {
  constructor(private router: Router,
    public surveyService: SurveyServiceService
  ) { }
  isVisible: boolean = true;

  showAlert() {
    this.isVisible = true;
  }

  closeAlert() {
    this.isVisible = false;
    this.router.navigateByUrl(`/forms/${this.surveyService.formUUID}`);
  }
}
