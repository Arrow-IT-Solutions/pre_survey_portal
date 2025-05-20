import { Injectable } from '@angular/core';
import { CustomerResponse } from 'src/app/modules/customers/customers.module';
import { QuestionResponse } from 'src/app/modules/questions/questions.module';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public SelectedData: QuestionResponse | null = null;
  public Dialog: any | null = null;
}