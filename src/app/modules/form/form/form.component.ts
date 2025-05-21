import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { formResponse } from '../form.module';
import { FormService } from 'src/app/layout/service/form.service';
import { AddFormComponent } from '../add-form/add-form.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MessageService]
})
export class FormComponent {
    dataForm!: FormGroup;
    loading = false;
    pageSize: number = 12;
    first: number = 0;
    totalRecords: number = 0;
    btnLoading: boolean = false;
    constructor(public formBuilder:FormBuilder,public layoutService: LayoutService,public formService:FormService){
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
    openAddForm(row: formResponse | null = null){
        window.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.style.overflow = 'hidden';
            this.formService.SelectedData = row
            let content = this.formService.SelectedData == null ? 'Create_form' : 'Update_form';

            var component = this.layoutService.OpenDialog(AddFormComponent, content);
            this.formService.Dialog = component;
            component.OnClose.subscribe(() => {
              document.body.style.overflow = '';
              this.FillData();
            });

    }

    async FillData(pageIndex: number = 0) {

    }

      paginate(event: any) {
        this.pageSize = event.rows
        this.first = event.first


      }

}
