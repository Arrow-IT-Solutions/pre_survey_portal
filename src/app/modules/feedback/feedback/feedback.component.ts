import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertModelComponent } from '../alert-model/alert-model.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
dataform!:FormGroup;
@ViewChild(AlertModelComponent) alertModal!: AlertModelComponent;
constructor(public formBuilder:FormBuilder)
  {
     this.dataform=this.formBuilder.group({
      feedback_note:[''],
     })
  }

  ngAfterViewInit() {
    this.alertModal.showAlert(); // عرض مربع الحوار عند تحميل الصفحة
  }
}
