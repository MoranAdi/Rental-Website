import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { RegisterComponent } from './components/register/register.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { AdminGuardService } from './services/admin-guard.service';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeGuardService } from './services/employee-guard.service';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { CustomerGuardService } from './services/customer-guard.service';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo:"/home"},
  { path: "home", component: HomeComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "search-car", component: SearchCarComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LogInComponent },
  { path: "logout", component: LogOutComponent },
  { path: "orderDetails/:id", component: OrderDetailsComponent },
  { path: "employee", canActivate: [EmployeeGuardService], component: EmployeeComponent },
  { path: "my-orders", canActivate: [CustomerGuardService], component: CustomerOrdersComponent },
  {path: "admin", canActivate: [AdminGuardService], loadChildren:"./modules/admin.module#AdminModule"},
  {path: "not-found", component: PageNotFoundComponent},
  {path: "**" ,redirectTo:"/not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }