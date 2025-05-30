import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedBacksComponent } from './feed-backs/feed-backs.component';

const routes: Routes = [
  {
    path: '',
    component: FeedBacksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedBacksRoutingModule { }
