import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'errors',
        loadChildren: () =>
          import('./features/errors/errors.routes').then((m) => m.errorsRoutes),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.homeRoutes),
        data: { title: 'HOME' },
      },
     
    ],
  },
  { path: '**', redirectTo: '/errors/404' },
];
