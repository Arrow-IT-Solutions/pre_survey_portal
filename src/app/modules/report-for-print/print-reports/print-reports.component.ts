import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/Core/services/report.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { PrintService, Setting } from 'src/app/layout/service/print.service';

@Component({
  selector: 'app-print-reports',
  templateUrl: './print-reports.component.html',
  styleUrls: ['./print-reports.component.scss']
})
export class PrintReportsComponent {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  id: any;
  date: any;
  data: PaymentResponse;
  elmentContent?:string;

  constructor(public route:Router,public layoutService: LayoutService,public reportService:ReportService,public printService:PrintService){

  }
  backHome(){
    this.route.navigate(['layout-admin/reports'])
  }
  print(){
    const content = document.getElementById('pdfTable')?.outerHTML || '';

    console.log("Content : ",content);
    let config :Setting =
    {
      printerName : this.printService.printerConfig.printerNameReceipt1,
      unit : 'mm',
      orientation  : 'landscape',
      width:297,
      height : 210,
      copies : 1,
      paperSize : 'a4'
    }

    this.printService.Print(content,config);

  }

}
