import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent {
   dataForm!: FormGroup;
    loading = false;
    pageSize: number = 12;
    first: number = 0;
    totalRecords: number = 0;
    
    constructor(public formBuilder:FormBuilder){
      this.dataForm=this.formBuilder.group({
        customerName:[''],
        answer:['']
      })

    }
  
  
    async resetform() {
     
    }
    paginate(event: any) {
      this.pageSize = event.rows
      this.first = event.first
      
  
    }

}
