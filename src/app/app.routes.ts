import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './core/error/error.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    component: ErrorComponent,
    data: { statusCode: 404, message: 'Page not found' },
  },
];
