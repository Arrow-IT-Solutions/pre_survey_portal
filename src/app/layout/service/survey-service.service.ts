import { Injectable } from '@angular/core';
import { SubmitAnswersRequest, SurveySession, SurveyResponse } from 'src/app/modules/SurveySession/survey-session/survey-session.module';
import { HttpClientService } from 'src/app/Core/services/http-client.service';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyServiceService {
  private session: SurveySession | null = null;
  public SelectedData: SurveyResponse;
  public customerUUID: any
  public formUUID: any
  setSession(sess: SurveySession) {
    this.session = sess;
  }
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  getSession(): SurveySession {
    if (!this.session) {
      throw new Error('Survey session has not been initialized!');
    }
    return this.session;
  }
  clearSession() {
    this.session = null;
  }

  async Add(data: SubmitAnswersRequest) {
    const apiUrl = `/api/survey`;

    return await this.httpClient.post(apiUrl, data);
  }
}
