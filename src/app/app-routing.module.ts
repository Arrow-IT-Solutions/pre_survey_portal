import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuardService } from './Core/guard/auth-guard.service';
import { ContentLayoutAdminComponent } from './layout/content-layout-admin/content-layout-admin.component';


const routes: Routes = [
  {
    path: 'forms/:uuid',
    loadChildren: () =>
      import('./modules/user-forms/user-forms.module').then((m) => m.UserFormsModule
      )
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'user-questions/:uuid',
    loadChildren: () =>
      import('./modules/user-questions/user-questions.module').then((m) => m.UserQuestionsModule)
  },
  {
    path: 'user-feedback',
    children: [{
      path: '',
      loadChildren: () =>
        import('./modules/feedback/feedback.module').then(
          (m) => m.FeedbackModule
        )
    }],
  },
  {
    path: 'thanks',
    children: [{
      path: '',
      loadChildren: () =>
        import('./modules/thank-page/thank-page.module').then(
          (m) => m.ThankPageModule
        )
    }],
  },
  {
    path: 'print-reports',
    children: [{
      path: '',
      loadChildren: () =>
        import('./modules/report-for-print/report-for-print.module').then(
          (m) => m.ReportForPrintModule
        )
    }],
  },
  {
    path: 'layout-admin',
    component: ContentLayoutAdminComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('./modules/customers/customers.module').then(
            (m) => m.CustomersModule
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
        path: 'answers',
        loadChildren: () =>
          import('./modules/answers/answers.module').then(
            (m) => m.AnswersModule
          )
      },
      {
        path: 'customers-answers',
        loadChildren: () =>
          import('./modules/customers-answers/customers-answers.module').then(
            (m) => m.CustomersAnswersModule
          )
      },
      {
        path: 'questions',
        loadChildren: () =>
          import('./modules/questions/questions.module').then(
            (m) => m.QuestionsModule
          )
      },
      {
        path: 'options',
        loadChildren: () =>
          import('./modules/options/options.module').then(
            (m) => m.OptionsModule
          )
      },
      {
        path: 'questions',
        loadChildren: () =>
          import('./modules/questions/questions.module').then(
            (m) => m.QuestionsModule
          )
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./modules/form/form.module').then(
            (m) => m.FormModule
          )
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./modules/feedback/feedBacks.module').then(
            (m) => m.FeedBacksModule
          )
      },
      {
        path: 'password',
        loadChildren: () =>
          import('./modules/password/password.module').then(
            (m) => m.PasswordModule
          )
      },
      {
        path: 'country-code',
        loadChildren: () =>
          import('./modules/country-code/country-code.module').then(
            (m) => m.CountryCodeModule
          )
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            (m) => m.ReportsModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/settings/settings.module').then(
            (m) => m.SettingsModule
          )
      }

    ]
  },




  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
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
