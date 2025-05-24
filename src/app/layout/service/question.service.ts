import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerResponse } from 'src/app/modules/customers/customers.module';
import { QuestionRequest, QuestionResponse, QuestionSearchRequest, QuestionUpdateRequest } from 'src/app/modules/questions/questions.module';
import { LayoutService } from './layout.service';
import { HttpClientService } from 'src/app/Core/services/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public SelectedData: QuestionResponse | null = null;
  public Dialog: any | null = null;
  private refreshQuestionsSubject = new Subject<void>();

  refreshQuestions$ = this.refreshQuestionsSubject.asObservable();

  triggerRefreshQuestions() {
    this.refreshQuestionsSubject.next();
  }
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  async Add(data: QuestionRequest) {
    const apiUrl = `/api/question`;

    return await this.httpClient.post(apiUrl, data);
  }

  async Search(filter: QuestionSearchRequest) {

    const apiUrl = `/api/question/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }

  async Update(data: QuestionUpdateRequest) {

    const apiUrl = `/api/question`;
    return await this.httpClient.put(apiUrl, data);
  }

  async Delete(uuid: string) {

        const apiUrl = `/api/question/${uuid}`;
        return await this.httpClient.delete(apiUrl, uuid);

      }


}
