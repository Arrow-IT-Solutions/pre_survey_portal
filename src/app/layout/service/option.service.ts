import { Injectable } from '@angular/core';
import { CustomerResponse } from 'src/app/modules/customers/customers.module';


@Injectable({
  providedIn: 'root'
})
export class OptionService {
  public SelectedData: CustomerResponse | null = null;
  public Dialog: any | null = null;
}