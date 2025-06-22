import { Component, ComponentRef, Injectable } from '@angular/core';
import { AdhostDirective } from 'src/app/Core/directive/adhost.directive';
import { DynamicDilogComponent } from '../component/dynamic-dilog/dynamic-dilog.component';
import { Type } from '@angular/compiler';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import * as queryString from 'query-string';
import * as moment from 'moment';
import { LocalService } from 'src/app/shared/service/local.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public adHost: AdhostDirective;
  public translate: TranslateService;

  public config = {
    dir: 'ltr',
    lang: 'en',
  };

  constructor() { }

  public OpenDialog(componentView: any, componentName: string) {
    this.adHost.viewContainerRef.clear();
    const component = this.adHost.createMyComponent(DynamicDilogComponent);

    component.instance.componentView = componentView;
    component.instance.adHostDynamic = this.adHost;
    component.instance.componentName = componentName;

    return component.instance;
  }

  showError(
    messageService: MessageService,
    key?: string,
    autoClose?: boolean,
    content?: string
  ) {
    messageService.add({
      key: key,
      sticky: !autoClose,
      severity: 'error',
      summary: '',
      detail: content,
    });
  }

  showSuccess(
    messageService: MessageService,
    key?: string,
    autoClose?: boolean,
    content?: string
  ) {
    messageService.add({
      key: key,
      sticky: !autoClose,
      severity: 'success',
      summary: '',
      detail: content,
    });
  }

  filterNonNull(obj: any) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }

  Filter(obj: any) {
    return queryString.stringify(this.filterNonNull(obj));
  }

  ConvertToISoString(date: any) {
    // var newDateAsString = date.toISOString().split('T')[0];
    console.log(date);
    return date.toISOString();
  }

  ConvertToIso(date: any) {
    const dateString = date;

    const dateObject = new Date(dateString);

    const monthIndex = dateObject.getMonth();

    const month = monthIndex + 1;

    // console.log("M : ",month);

    const day = dateObject.getDate();

    // console.log("D : ",day);

    const year = dateObject.getFullYear();

    // console.log("year : ",year)

    var newDate = year + '-' + month + '-' + day;

    const inputDate = new Date(newDate);
    const isoDate = inputDate.toISOString();

    return isoDate;
  }

  TranslateKey(key: string) {
    let txt = "";
    this.translate.get(key).subscribe((res: string) => {

      txt = res;

    });

    return txt
  }

  DownloadExcel(dataBase64, excelName) {

    const arrayBuffer = this.base64ToArrayBuffer(dataBase64);
    var binaryData = atob(dataBase64.toString());
    const blob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = excelName + '.xlsx';
    a.click();

    // Revoke the object URL to free up resources
    window.URL.revokeObjectURL(url);

  }


  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    // atob gives us the “binary” string back
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    // create a view into an ArrayBuffer
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

}
