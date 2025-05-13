import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuardService } from './Core/guard/auth-guard.service';
import { ContentLayoutAdminComponent } from './layout/content-layout-admin/content-layout-admin.component';
import { VerifyComponent } from './modules/Verify/Verify/verify.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'verify',
    pathMatch: 'full',
  },
  // {
  //   path: 'layout',
  //   component: ContentLayoutComponent,
  //   // canActivate: [AuthGuardService],
  //   children: [
  //     {
  //       path: 'home',
  //       loadChildren: () =>
  //         import('./modules/home/home.module').then(
  //           (m) => m.HomeModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: 'layout-admin',
    component: ContentLayoutAdminComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'clients',
        loadChildren: () =>
          import('./modules/clients/clients.module').then(
            (m) => m.ClientsModule
          )
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./modules/employees/employees.module').then(
            (m) => m.EmployeesModule
          )
      },
      {
        path: 'dashBoard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          )
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./modules/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          )
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./modules/notification/notification.module').then(
            (m) => m.NotificationModule
          )
      },
      {
        path: 'password',
        loadChildren: () =>
          import('./modules/Password/password.module').then(
            (m) => m.PasswordModule
          )
      },

    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'verify',
    component: VerifyComponent,
    loadChildren: () =>
      import('./modules/Verify/verify.module').then((m) => m.VerifyModule),
  },

  // {
  //   path: 'segments',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./modules/segments/segments.module').then(
  //       (m) => m.SegmentsModule
  //     ),
  // },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
