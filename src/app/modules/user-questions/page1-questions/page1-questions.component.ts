import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-page1-questions',
  templateUrl: './page1-questions.component.html',
  styleUrls: ['./page1-questions.component.scss']
})
export class Page1QuestionsComponent {
  dataForm!:FormGroup;
  currentlang = 'Arabic';
  constructor(public formBuilder:FormBuilder,public layoutService : LayoutService,@Inject(DOCUMENT) private document: Document,public route:Router){
    this.dataForm=this.formBuilder.group({
      answer1:[''],
      answer2:[''],
      answer3:[''],
      answer4:['']
    })
  }
   async ngOnInit() {
      this.checkCurrentLang();
    }
    changeLang(lang : string)
    {
       console.log("current Lang : ",lang);
  
      if(lang == 'en')
      {
        this.currentlang = "English"
        this.layoutService.config = 
        {
          dir : 'ltr',
          lang : 'en'
        }
  
      }
      else if( lang == 'ar')
      {
        this.currentlang = "عربي"
        this.layoutService.config = 
        {
          dir : 'rtl',
          lang : 'ar'
        }
      }
  
      localStorage.setItem('lang', this.layoutService.config.lang);
      localStorage.setItem('dir', this.layoutService.config.dir);
      this.document.documentElement.lang = this.layoutService.config.lang;
  
       window.location.reload();
    }
     checkCurrentLang() {
      if(this.layoutService.config.lang == 'en')
        {
          this.currentlang = "English"
         
    
        }
        else if( this.layoutService.config.lang == 'ar')
        {
          this.currentlang = "عربي"
         
        }
    }
    openPage2(){
     this.route.navigate(['user-questions/page2'])
    }

}
