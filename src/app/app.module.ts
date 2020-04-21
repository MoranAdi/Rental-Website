import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { FilteredCarsPipe } from './pipes/filtered-cars.pipe';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    HomeComponent,
    SearchCarComponent,
    LogInComponent,
    LogOutComponent,
    RegisterComponent,
    FilteredCarsPipe,
    OrderDetailsComponent,
    EmployeeComponent,
    CustomerOrdersComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule, AppRoutingModule, 
      NgbModule, FormsModule, HttpClientModule, 
      BrowserAnimationsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, 
      MatButtonModule, MatIconModule, MatDialogModule, MatCardModule, MatTableModule, MatMenuModule, MatProgressSpinnerModule,
      MatTabsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }


