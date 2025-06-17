import { Component, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { FormService } from 'src/app/layout/service/form.service';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QRCodeDialogComponent implements AfterViewInit {
  @ViewChild('qrCodeElement', { static: true })
  qrCodeElement!: ElementRef<HTMLDivElement>;

  header: string = '';

  private qrCode!: QRCodeStyling;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
    public formService: FormService,
    public translate: TranslateService
  ) {
    // build an Options object
    const options: Options = {
      width: 300,
      height: 300,
      data: this.data,
      image: '../../../../assets/images/LogoICON.svg',

      dotsOptions: {
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0.0, color: '#A72225' },  // your deep brick-red
            { offset: 0.5, color: '#724B20' },  // your warm brown
            { offset: 1.0, color: '#704620' }   // the darker brown
          ]
        }
      },

      cornersSquareOptions: {
        type: 'extra-rounded',
        // you can also gradient these or keep them solid:
        color: '#A72225'
      },

      backgroundOptions: {
        color: '#FFFFFF'
      }
    };

    this.qrCode = new QRCodeStyling(options);
  }

  ngOnInit() {

    if (this.formService.SelectedData) {
      this.header = this.formService.SelectedData.formTranslations!['en'].name + ' Form QR'

    }

  }

  ngAfterViewInit() {
    this.qrCode.append(this.qrCodeElement.nativeElement);
  }

  download() {
    let name = this.formService.SelectedData?.formTranslations!['en'].name
    this.qrCode.download({ name: name + 'FormURL', extension: 'png' });
  }
}
