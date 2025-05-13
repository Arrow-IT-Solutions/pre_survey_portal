import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase, RequestBase, SearchRequestBase } from 'src/app/shared/class/class';
import { UserResponse } from '../auth/auth.module';



@NgModule({
  declarations: [
    NotificationsComponent,
    AddNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NotificationModule { }
export interface NotificationResponse extends ResponseBase {

  uuid?: string;
  note: string;
  userIDFK: string;
  NotificationType: string;
  notificationTypeValue: string,
  user: UserResponse
  title: string
}
export interface NotificationSearchRequest extends SearchRequestBase {
  uuid?: string;
  name: string;
  type: string;
  includeUser?: string,


}

export interface NotificationUpdateRequest extends RequestBase {
  uuid?: string,
  notificationType?: string,
  note?: string,
  title?: string
}

export interface NotificationRequest extends RequestBase {
  uuid?: string,
  notificationType?: string,
  note?: string,
  userIDFK?: string,
  title?: string
}
