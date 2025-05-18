import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss'],
  providers: [MessageService]
})
export class AddOptionComponent {
  dataForm!: FormGroup;
    submitted: boolean = false;
    btnLoading: boolean = false;
    loading: boolean = false;
    constructor(public formBuilder:FormBuilder){
      this.dataForm=this.formBuilder.group({
        optionEn:[''],
        optionAr:[''],
       
      })
    }
  
    async onSubmit() {}

}
