import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { HttpStatusCode } from '@angular/common/http';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  {
    path: '**',
    component: ErrorComponent,
    data: { statusCode: HttpStatusCode.NotFound, message: 'Page not found' },
  },
];
