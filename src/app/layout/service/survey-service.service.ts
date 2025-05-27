import { Injectable } from '@angular/core';
import { SurveySession } from 'src/app/modules/SurveySession/survey-session/survey-session.module';

@Injectable({
  providedIn: 'root'
})
export class SurveyServiceService {
  private session: SurveySession | null = null;
  setSession(sess: SurveySession) {
    this.session = sess;
  }
  constructor() { }

  getSession(): SurveySession {
    if (!this.session) {
      throw new Error('Survey session has not been initialized!');
    }
    return this.session;
  }
  clearSession() {
    this.session = null;
  }
}
