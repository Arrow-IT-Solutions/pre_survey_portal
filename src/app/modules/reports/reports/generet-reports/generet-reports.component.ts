import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnswerService } from 'src/app/layout/service/answer.service';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-generet-reports',
  templateUrl: './generet-reports.component.html',
  styleUrls: ['./generet-reports.component.scss'],
  providers: [MessageService]
})
export class GeneretReportsComponent {
  dataForm!: FormGroup;
        submitted: boolean = false;
        btnLoading: boolean = false;
        loading: boolean = false;
        constructor(public formBuilder:FormBuilder,
          public route:Router,
          public messageService: MessageService,
          public answerService: AnswerService,
          public layoutService: LayoutService,
  
        ){
          this.dataForm=this.formBuilder.group({
            fromDate:['',Validators.required],
            toDate:['',Validators.required],
  
          })
        }
        get form(): { [key: string]: AbstractControl } {
        return this.dataForm.controls;
      }
       async onSubmit() {
       
      }

       openReportsForPrint(){
    this.route.navigate(['print-reports']);
  }

}
