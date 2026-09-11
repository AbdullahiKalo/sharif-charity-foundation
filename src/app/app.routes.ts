import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'programs',
        loadComponent: () =>
          import('./pages/programs/programs.component').then((m) => m.ProgramsComponent),
      },
      {
        path: 'programs/orphans',
        loadComponent: () =>
          import('./pages/programs/orphans/orphans.component').then((m) => m.OrphansComponent),
      },
      {
        path: 'programs/mosques',
        loadComponent: () =>
          import('./pages/programs/mosques/mosques.component').then((m) => m.MosquesComponent),
      },
      {
        path: 'programs/schools',
        loadComponent: () =>
          import('./pages/programs/schools/schools.component').then((m) => m.SchoolsComponent),
      },
      {
        path: 'programs/hadiya',
        loadComponent: () =>
          import('./pages/programs/hadiya/hadiya.component').then((m) => m.HadiyaComponent),
      },
      // Until the remaining pages exist, unknown paths fall back to the home page
      // so the nav links do not dead-end.
      { path: '**', redirectTo: '' },
    ],
  },
];
