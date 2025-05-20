import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
  providers: [MessageService]
})
export class AddQuestionComponent {
 
 dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  forms: string[] = ['Tournament And games', 'Birthday', 'Mathes','Lorem ipsum, dolor sit amet', ];
  selectedFrom: string[] = [];
  dropdownForm: boolean = false;
    
  
    toggleDropdownForm() {
      this.dropdownForm = !this.dropdownForm;
    }
   
  
    toggleSelectionForm(option: string) {
      const index = this.selectedFrom.indexOf(option);
      if (index === -1) {
        this.selectedFrom.push(option);
      } else {
        this.selectedFrom.splice(index, 1);
      }
    }
   
  
    isSelectedFrom(option: string): boolean {
      return this.selectedFrom.indexOf(option) !== -1;
    }
      constructor(public formBuilder:FormBuilder,
        public router:Router
      ){
        this.dataForm=this.formBuilder.group({
         questionAr:[''],
         questionEn:[''],
         form:[''],
        })
      }
      ngOnInit(){
       
      }
      async onSubmit() {}
  
       removeForm(option: string) {
      const index = this.selectedFrom.indexOf(option);
      if (index !== -1) {
        this.selectedFrom.splice(index, 1);
      }}

   options: string[] = ['Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem tempore quas laborum inventore dicta qui quasi maxime facere,',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem tempore quas',
    
   ];
  selectedOption: string[] = [];
  dropdownOptions: boolean = false;
  searchTerm: string = '';


  toggleDropdownOption() {
    this.dropdownOptions = !this.dropdownOptions;
  }


  toggleSelectionOption(option: string) {
    const index = this.selectedOption.indexOf(option);
    if (index === -1) {
      this.selectedOption.push(option);
    } else {
      this.selectedOption.splice(index, 1);
    }
  }

 
   isSelectedOption(option: string): boolean {
    return this.selectedOption.indexOf(option) !== -1;
  }
  
   
  
    // constructor(public formBuilder:FormBuilder){
    //   this.dataForm=this.formBuilder.group({
    //    questionAr:[''],
    //    questionEn:[''],
    //    form:[''],
    //   })
    // }
    // ngOnInit(){
     
    // }
  


     removeOption(option: string) {
    const index = this.selectedOption.indexOf(option);
    if (index !== -1) {
      this.selectedOption.splice(index, 1);
    }}

}
