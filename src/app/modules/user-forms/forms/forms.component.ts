import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  dataForm!: FormGroup;
    btnLoading: boolean = false;
    currentlang = 'Arabic';
    constructor(public formBuilder:FormBuilder,public layoutService : LayoutService,@Inject(DOCUMENT) private document: Document){
      this.dataForm=this.formBuilder.group({
        userName:[''],
        maritalStatus:[''],
        dateOfBirth:[''],
        countryCode:[''],
        phoneNumber:[''],
        email:[''],
        country:[''],
        info:[''],
        sendOffers:[''],
      
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

}
