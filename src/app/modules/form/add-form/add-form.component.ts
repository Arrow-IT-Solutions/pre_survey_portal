import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [MessageService]
})
export class AddFormComponent {
    dataForm!: FormGroup;
      submitted: boolean = false;
      btnLoading: boolean = false;
      loading: boolean = false;
      constructor(public formBuilder:FormBuilder,
        public messageService: MessageService,
        public layoutService: LayoutService,
      ){
        this.dataForm=this.formBuilder.group({
          formNameEn:['',Validators.required],
          formNameAr:['',Validators.required],
  
        })
      }
      async onSubmit() {}
      
    
    

}
