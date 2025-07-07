import { Injectable } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { UserService } from './user.service';

import Axios from 'axios';
import { UserResponse } from 'src/app/modules/auth/auth.module';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';
import { PrintReportRequest, ReportResponse, ReportSearchRequest } from 'src/app/modules/reports/reports.module';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public SelectedData: ReportResponse | null = null;
  public Dialog: any | null = null;
  constructor(public layoutService: LayoutService, public httpClient: HttpClientService) { }

  async ExpiredLicenceReport(filter: ReportSearchRequest) {

    const apiUrl = `/api/report/expiredLicenceReport?${this.layoutService.Filter(filter)}`;

    return await this.httpClient.get(apiUrl)

  }

  async Add(data: PrintReportRequest) {
    const apiUrl = `/api/report`;

    return await this.httpClient.post(apiUrl, data);
  }
}
