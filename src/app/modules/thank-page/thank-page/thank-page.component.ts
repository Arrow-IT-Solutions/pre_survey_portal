import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-page',
  templateUrl: './thank-page.component.html',
  styleUrls: ['./thank-page.component.scss']
})
export class ThankPageComponent {
  constructor(public route:Router){

  }
 goBackHome(){
  this.route.navigate(['/forms/:uuid'])
 }
}
