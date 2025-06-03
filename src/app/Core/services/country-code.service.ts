import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { CountryCodeRequest, CountryCodeResponse, CountryCodeSearchRequest, CountryCodeUpdateRequest } from 'src/app/modules/country-code/country-code.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {
  public SelectedData: CountryCodeResponse | null = null;
  public Dialog: any | null = null;
   private refreshCountryCodesSubject = new Subject<void>();

    refreshCountryCodes$ = this.refreshCountryCodesSubject.asObservable();

    triggerRefreshCountryCodes() {
      this.refreshCountryCodesSubject.next();
    }
    constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

        async Add(data: CountryCodeRequest) {
        const apiUrl = `/api/countryCode`;

        return await this.httpClient.post(apiUrl, data);
      }

    async Search(filter: CountryCodeSearchRequest) {

      const apiUrl = `/api/countryCode/list?${this.layoutService.Filter(filter)}`;

        return await this.httpClient.get(apiUrl)

    }

        async Update(data: CountryCodeUpdateRequest) {

        const apiUrl = `/api/countryCode`;
        return await this.httpClient.put(apiUrl, data);
      }

          async Delete(uuid: string) {

        const apiUrl = `/api/countryCode/${uuid}`;
        return await this.httpClient.delete(apiUrl, uuid);

      }

}
