import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-page',
  templateUrl: './thank-page.component.html',
  styleUrls: ['./thank-page.component.scss']
})
export class ThankPageComponent {
 isVisible: boolean = true;

  showAlert() {
    this.isVisible = true;
  }

  closeAlert() {
    this.isVisible = false;
  }
}
