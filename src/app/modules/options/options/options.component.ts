import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { AddOptionComponent } from '../add-option/add-option.component';
import { OptionResponse } from '../options.module';
import { OptionService } from 'src/app/layout/service/option.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  providers: [MessageService]
})
export class OptionsComponent {
  dataForm!: FormGroup;
  loading = false;
  pageSize: number = 12;
  first: number = 0;
  totalRecords: number = 0;
constructor(public formBuilder:FormBuilder,public layoutService: LayoutService,public translate: TranslateService,public OptionService:OptionService){
  this.dataForm=this.formBuilder.group({
    name:[''],
    
  })
}

async FillData(pageIndex: number = 0) {

}
openAddOption(row: OptionResponse | null = null){
    window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
      this.OptionService.SelectedData = row
      let content = this.OptionService.SelectedData == null ? 'Create_Option' : 'Update_Option';
      this.translate.get(content).subscribe((res: string) => {
        content = res
      });
      var component = this.layoutService.OpenDialog(AddOptionComponent, content);
      this.OptionService.Dialog = component;
      component.OnClose.subscribe(() => {
        document.body.style.overflow = '';
        this.FillData();
      });

}

  async resetform() {
   
  }
  paginate(event: any) {
    this.pageSize = event.rows
    this.first = event.first
    

  }
}
