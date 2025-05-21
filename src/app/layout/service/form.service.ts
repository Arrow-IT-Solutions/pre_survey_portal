import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/Core/services/http-client.service';
import { LayoutService } from './layout.service';
import { FormResponse, FormSearchRequest } from 'src/app/modules/form/form.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public SelectedData: FormResponse | null = null;
  public Dialog: any | null = null;
  private refreshFormsSubject = new Subject<void>();

  refreshForms$ = this.refreshFormsSubject.asObservable();

  triggerRefreshForms() {
    this.refreshFormsSubject.next();
  }
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  async Search(filter: FormSearchRequest) {

    const apiUrl = `/api/form/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }
}
