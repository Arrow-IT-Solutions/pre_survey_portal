import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2-questions',
  templateUrl: './page2-questions.component.html',
  styleUrls: ['./page2-questions.component.scss']
})
export class Page2QuestionsComponent {
  dataForm!:FormGroup;
    currentlang = 'Arabic';
    constructor(public formBuilder:FormBuilder,public route:Router){
      this.dataForm=this.formBuilder.group({
        answer1:[''],
        answer2:[''],
        answer3:[''],
        answer4:['']
      })
    }
    openFeedback(){
      this.route.navigate(['user-feedback']);
    }
    
      

}
