import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerResponse } from 'src/app/modules/customers/customers.module';
import { OptionRequest, OptionResponse, OptionSearchRequest, OptionUpdateRequest } from 'src/app/modules/options/options.module';
import { LayoutService } from './layout.service';
import { HttpClientService } from 'src/app/Core/services/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class OptionService {
 public SelectedData: OptionResponse | null = null;
  public Dialog: any | null = null;
  private refreshOptionsSubject = new Subject<void>();

  refreshOptions$ = this.refreshOptionsSubject.asObservable();

  triggerRefreshOptions() {
    this.refreshOptionsSubject.next();
  }
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

      async Add(data: OptionRequest) {
      const apiUrl = `/api/option`;

      return await this.httpClient.post(apiUrl, data);
    }

  async Search(filter: OptionSearchRequest) {

    const apiUrl = `/api/option/list?${this.layoutService.Filter(filter)}`;

      return await this.httpClient.get(apiUrl)

  }

      async Update(data: OptionUpdateRequest) {

      const apiUrl = `/api/option`;
      return await this.httpClient.put(apiUrl, data);
    }

        async Delete(uuid: string) {

      const apiUrl = `/api/option/${uuid}`;
      return await this.httpClient.delete(apiUrl, uuid);

    }
}
