import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalService } from 'src/app/shared/service/local.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { UserService } from 'src/app/Core/services/user.service';
import { AuthService } from 'src/app/Core/services/auth.service';
import { AuthRequest, CurrentUser } from '../../auth/auth.module';
import { ClientsService } from 'src/app/Core/services/clients.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  providers: [MessageService]
})
export class VerifyComponent {
  @ViewChild('UserName', { static: false }) emailElement: ElementRef | any;
  verifyForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  buttonLoading: boolean = false;
  buttonSubmitted: boolean = false;
  isVerified: boolean = false;
  uuid: string;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public localService: LocalService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public userService: UserService,
    public authService: AuthService,
    public clientService: ClientsService) {
    this.verifyForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
  get form(): { [key: string]: AbstractControl } {
    return this.verifyForm.controls;
  }

  ngAfterViewInit() {
    // this.emailElement.nativeElement.focus();
  }
  public onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        break;
      case 'Enter':
        this.onSubmit();
        break;
      case 'Tab':
        break;
    }
  }

  async onSubmit() {

    try {

      this.submitted = true;
      this.buttonSubmitted = true;

      if (this.verifyForm.invalid) {
        this.submitted = true;
        return;
      }

      this.buttonLoading = true;

      await this.Save();

    }
    catch (exceptionVar) {

    }
    finally {


    }
  }

  async Save() {
    try {

      var authRequest: AuthRequest = {
        userName: this.verifyForm.controls['UserName'].value,
        password: this.verifyForm.controls['Password'].value,
        platformType: '1',
        countryCode: '+962'
      };

      const response = await this.authService.Auth(authRequest);

      if (response.requestStatus == 200) {
        this.layoutService.showSuccess(this.messageService, 'toast', true, response.requestMessage);
        this.userService.currentUser = {
          userUUID: response.uuid,
          userName: response.userName,
          userType: response.userType,
          token: response.token,
          loggedInUser: response.userLoggedIn
        };
        this.uuid = response.userLoggedIn
        this.isVerified = true;
        this.submitted = false;
        this.buttonSubmitted = false;
        this.buttonLoading = false;
      }
      else {
        this.layoutService.showError(this.messageService, 'toast', true, response.requestMessage);

      }
    }
    catch (ex) {

    }
    finally {
      this.submitted = false;
      this.buttonLoading = false;
      this.buttonSubmitted = false;
    }


  }

  async Delete() {

    const response = (await this.clientService.Delete(this.uuid)) as any;

    this.layoutService.showSuccess(this.messageService, 'toste', true, response.requestMessage);

    this.router.navigateByUrl('');

  }

}
