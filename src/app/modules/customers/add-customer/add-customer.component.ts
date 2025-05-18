import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  providers: [MessageService]
})
export class AddCustomerComponent {
dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  constructor(public formBuilder:FormBuilder){
    this.dataForm=this.formBuilder.group({
      fullNameAr:[''],
      fullNameEn:[''],
      SocialState:[''],
      birthDate:[''],
      state:[''],
      email:[''],
      phone:[''],
      favouriteFood:[''],
      KnowingUs:[''],
      sendOffers:['']
    })
  }

  async onSubmit() {}
}
