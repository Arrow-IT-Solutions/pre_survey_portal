import { Injectable } from "@angular/core";

// const qz = require("qz-tray");
// import * as  qz from '../../src/assets/js/';
// declare var require: any;
// declare var jQuery: any;



export interface Setting {
    printerName : string,
    unit:string,
    width:number,
    height:number,
    copies:number,
    orientation?:string,
    paperSize?: string
}

export interface PrinterConfig {
  printerNameReceipt1:string
        printerNameReceipt2 :string
        printerNameCash : string,
        printerNameBarcode : string,
        Cert : string,
        key:string
}

export interface PrinterCertificate {
        Cert : string,
        key:string
}


@Injectable({
    providedIn: 'root',
  })

  export class PrintService {
  public printerConfig :PrinterConfig;
  public printerCertificate :PrinterCertificate;
  
  public Print(contentHtml : string , setting:Setting){}
   
  }


