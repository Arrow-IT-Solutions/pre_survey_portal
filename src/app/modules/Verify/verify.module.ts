import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyRoutingModule } from './verify.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerifyComponent } from './Verify/verify.component';




@NgModule({
  declarations: [VerifyComponent],
  imports: [
    VerifyRoutingModule, SharedModule
  ]
})
export class VerifyModule { }
