import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JSInfoComponent } from './js-info/js-info.component';
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:page', component: PostComponent },
  { path: 'jsinfo', component: JSInfoComponent },
  { path: '**', pathMatch: 'full', component: HomeComponent },
];
