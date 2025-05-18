import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesFormRoutingModule } from './games-form-routing.module';
import { GamesComponent } from './games/games.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesFormRoutingModule,
    SharedModule,
   
    ReactiveFormsModule
  ]
})
export class GamesFormModule { }
