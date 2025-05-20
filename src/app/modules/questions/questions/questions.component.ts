import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { QuestionService } from 'src/app/layout/service/question.service';
import { QuestionResponse } from '../questions.module';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [MessageService]
})
export class QuestionsComponent {
   dataForm!: FormGroup;
      loading = false;
      pageSize: number = 12;
      first: number = 0;
      totalRecords: number = 0;
      
      constructor(public formBuilder:FormBuilder,public layoutService: LayoutService,public translate: TranslateService,public QuestionService:QuestionService,public router:Router){
        this.dataForm=this.formBuilder.group({
         question:['']
        })
  
      }
      openAddQuestion(row: QuestionResponse | null = null){
          this.QuestionService.SelectedData = row;
    console.log('selected data : ', this.QuestionService.SelectedData);
       this.router.navigate(['layout-admin/questions/add-question']);;

      }
      async FillData(pageIndex: number = 0) {

}
    
    
      async resetform() {
       
      }
      paginate(event: any) {
        this.pageSize = event.rows
        this.first = event.first
        
    
      }

}
