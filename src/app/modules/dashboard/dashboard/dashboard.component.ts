import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardResponse, DashboardSearchRequest } from '../dashboard.module';
import { EmployeesService } from 'src/app/Core/services/employees.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DashboardsService } from 'src/app/Core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService]

})

export class DashboardComponent {
  basicData: any;
  basicOptions: any;
  loading = false;
  data: DashboardResponse;
  dataForm!: FormGroup;
  doneTypingInterval = 1000;
  typingTimer: any;
  isResetting: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    public dashboardService: DashboardsService,
    public translate: TranslateService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService) {
    this.dataForm = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
    });
  }
  async ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    await this.FillData()
  }

  async FillData(pageIndex: number = 0) {
    this.loading = true;

    let fromDate
    if (this.dataForm.controls['fromDate'].value == null || this.dataForm.controls['fromDate'].value == '') {
      fromDate = '';
    }
    else {
      fromDate = new Date(this.dataForm.controls['fromDate'].value.toISOString())
    }
    let toDate
    if (this.dataForm.controls['toDate'].value == null || this.dataForm.controls['toDate'].value == '') {
      toDate = '';
    } else {
      toDate = new Date(this.dataForm.controls['toDate'].value.toISOString());
    }
    let filter: DashboardSearchRequest = {
      dateFrom: fromDate.toLocaleString(),
      dateTo: toDate.toLocaleString(),
    };
    const response = (await this.dashboardService.Search(filter)) as any;


    this.ChartData(response)

    if (response != null) {
      this.data = response;
    }

    this.loading = false;
  }

  OnChange() {

    if (this.isResetting) { return }; // Do nothing if resetting

    console.log('here')

    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.FillData();
    }, this.doneTypingInterval);

  }
  async resetform() {
    this.isResetting = true;
    this.dataForm.reset();
    await this.FillData();
    this.isResetting = false;
  }

  ChartData(response) {
    const labels = response.clientChartDatas.map(clientChartData => clientChartData.day.substring(0, 3));

    const data = response.clientChartDatas.map(clientChartData => clientChartData.count);
    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Visitors',
          data: data,
          backgroundColor: ['rgba(239,82,83,.4)'],
          borderColor: ['#EF5253'],
          borderWidth: 2
        }
      ]
    };


  }
}
