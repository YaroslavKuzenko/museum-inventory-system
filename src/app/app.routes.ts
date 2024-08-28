import { Routes } from '@angular/router';
export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'main', loadComponent: () => import('./main-page/main-page.component').then(m => m.MainPageComponent)},
  {path: 'about-us', loadComponent: () => import('./about-us/about-us.component').then(m => m.AboutUsComponent)},
  {path: 'services', loadComponent: () => import('./services-page/services-page.component').then(m => m.ServicesPageComponent)},
  {path: 'blog', loadComponent: () => import('./blog-page/blog-page.component').then(m => m.BlogPageComponent)},
  {path: 'blog/:id', loadComponent: () => import('./blog-page/post-page/post-page.component').then(m => m.PostPageComponent)},
  {path: 'privacy-policy', loadComponent: () => import('./privacy-policy-page/privacy-policy-page.component').then(m => m.PrivacyPolicyPageComponent)},
];
