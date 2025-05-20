import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnswerResponse, AnswerSearchRequest } from 'src/app/modules/answers/answers.module';
import { LayoutService } from './layout.service';
import { HttpClientService } from 'src/app/Core/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

    public SelectedData: AnswerResponse | null = null;
    public Dialog: any | null = null;
    private refreshCustomersSubject = new Subject<void>();

  refreshCustomers$ = this.refreshCustomersSubject.asObservable();

  triggerRefreshCustomers() {
    this.refreshCustomersSubject.next();
  }
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

    async Search(filter: AnswerSearchRequest) {

      const apiUrl = `/api/answer/list?${this.layoutService.Filter(filter)}`;

        return await this.httpClient.get(apiUrl)

    }
}
