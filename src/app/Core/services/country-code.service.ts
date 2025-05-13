import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { HttpClientService } from './http-client.service';
import { CountryCodeResponse, CountryCodeSearchRequest } from 'src/app/modules/auth/auth.module';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {
  public SelectedData: CountryCodeResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  async Search(filter: CountryCodeSearchRequest) {

    const apiUrl = `/api/countryCode/list?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }

}
