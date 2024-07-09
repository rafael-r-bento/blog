import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JSInfoComponent } from './js-info/js-info.component';
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:page', component: PostComponent },
  { path: 'jsinfo', component: JSInfoComponent },
];
