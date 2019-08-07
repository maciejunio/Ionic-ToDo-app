import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './auth/guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginPageModule'
  },
  {
    path: 'register',
    loadChildren: './auth/register/register.module#RegisterPageModule'
  },
  { path: 'details/:id', loadChildren: './todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'details', loadChildren: './todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'add-task', loadChildren: './add-task/add-task.module#AddTaskPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
