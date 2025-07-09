import { Component, Inject, ViewChild } from '@angular/core';
import { AdhostDirective } from './Core/directive/adhost.directive';
import { DynamicDilogComponent } from './layout/component/dynamic-dilog/dynamic-dilog.component';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './Core/services/user.service';

import { LayoutService } from './layout/service/layout.service';
import { Direction } from '@angular/cdk/bidi';
import { LocalService } from './shared/service/local.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Point Of Sale';




  constructor(
    public localService: LocalService,
    public translate: TranslateService,
    public userService: UserService,
    public layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document
  ) {


    this.userService.currentUser = {
      userUUID: "response.uuid",
      userName: "response.userName",
      userType: "response.userType",
      token: "response.token",
      loggedInUser: "response.userLoggedIn"
    };
    this.localService.saveData('currentUser', JSON.stringify(this.userService.currentUser));
    this.localService.GetStorge();

    this.translate.use(this.layoutService.config.lang);

    this.document.documentElement.lang = this.layoutService.config.lang;
    console.log('app ts ngoninit');
  }

  ngOnInit(): void {


  }



  getDirection(): Direction | 'auto' {
    return this.layoutService.config.lang === 'ar' ? 'rtl' : 'ltr';
  }
}
