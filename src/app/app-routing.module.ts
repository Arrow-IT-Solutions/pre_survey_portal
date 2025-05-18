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
    path:'games-form',
    children:[{
      path:'',
      loadChildren: () =>
        import('./modules/games-form/games-form.module').then(
          (m) =>m.GamesFormModule
        )
    }],
  },
  {
    path:'birthday-form',
    children:[{
      path:'',
      loadChildren: () =>
        import('./modules/birthday-form/birthday-form.module').then(
          (m) =>m.BirthdayFormModule
        )
    }],
  },
    {
    path: 'layout-admin',
    component: ContentLayoutAdminComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path:'customers',
        loadChildren: () =>
          import('./modules/customers/customers.module').then(
            (m) =>m.CustomersModule
          )
      },
        {
        path:'answers',
        loadChildren: () =>
          import('./modules/answers/answers.module').then(
            (m) =>m.AnswersModule
          )
      },
      {
        path:'options',
        loadChildren: () =>
          import('./modules/options/options.module').then(
            (m) =>m.OptionsModule
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
