import { Injectable } from '@angular/core';
import { formResponse } from 'src/app/modules/form/form.module';




@Injectable({
  providedIn: 'root'
})
export class formService {
 public SelectedData: formResponse | null = null;
  public Dialog: any | null = null;}