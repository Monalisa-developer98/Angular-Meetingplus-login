import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'user-login', pathMatch: 'full' },
  { path: 'user-login', component: LoginComponent},
  { path: 'employee-detail/:id', component: EmployeeDetailComponent, canActivate: [authGuard], data: { expectedRole: 'USER' } },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { expectedRole: 'ADMIN' } },
  { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
