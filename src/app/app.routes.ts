import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Post } from './components/post/post';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'post/:page', component: Post },
  { path: 'contact', component: Contact }
];
