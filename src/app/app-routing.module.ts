import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuardService } from './Core/guard/auth-guard.service';
import { ContentLayoutAdminComponent } from './layout/content-layout-admin/content-layout-admin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'forms/:uuid',
    children: [{
      path: '',
      loadChildren: () =>
        import('./modules/user-forms/user-forms.module').then(
          (m) => m.UserFormsModule
        )
    }],
  },
  {
    path: 'user-questions',
    children: [{
      path: '',
      loadChildren: () =>
        import('./modules/user-questions/user-questions.module').then(
          (m) => m.UserQuestionsModule
        )
    }],
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
          import('./modules/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          )
      },

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
