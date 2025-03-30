import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AppShellComponent } from './core/layout/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/teams/teams.component').then(m => m.TeamsComponent)
      },
      {
        path: 'teams/:id',
        loadComponent: () =>
          import('./modules/teams/team-detail/team-detail.component').then(m => m.TeamDetailComponent)
      }
    ]
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
  }
];
