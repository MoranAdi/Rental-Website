import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddCarComponent } from '../components/add-car/add-car.component';
import { UpdateCarComponent } from '../components/update-car/update-car.component';
import { AdminLayoutComponent } from '../components/admin-layout/admin-layout.component';
import { ManageCarsComponent } from '../components/manage-cars/manage-cars.component';
import { ManageCarsTypeComponent } from '../components/manage-cars-type/manage-cars-type.component';
import { ManageUsersComponent } from '../components/manage-users/manage-users.component';
import { ManageOrdersComponent } from '../components/manage-orders/manage-orders.component';
import { AddCarTypeComponent } from '../components/add-car-type/add-car-type.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { AdminHomeComponent } from '../components/admin-home/admin-home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { UpdateUsersComponent } from '../components/update-users/update-users.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UpdateCarTypeComponent } from '../components/update-car-type/update-car-type.component';
import { UpdateOrderComponent } from '../components/update-order/update-order.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddOrderComponent } from '../components/add-order/add-order.component';

const routes: Routes = [
  {
      path: "", component: AdminLayoutComponent, children: [
          { path: "manage-cars", component: ManageCarsComponent },
          { path: "manage-cars-type", component: ManageCarsTypeComponent },
          { path: "manage-users", component: ManageUsersComponent },
          { path: "manage-orders", component: ManageOrdersComponent },
          { path: "update-car/:id", component: UpdateCarComponent },
          { path: "add-car-type", component: AddCarTypeComponent },
          { path: "admin-home", component: AdminHomeComponent },
          { path: "update-user/:id", component: UpdateUsersComponent },
          { path: "add-user", component: AddUserComponent },
          { path: "update-carType/:id", component: UpdateCarTypeComponent },
          { path: "add-car/:id", component: AddCarComponent },
          { path: "update-order/:id", component: UpdateOrderComponent },
      ]
  }
];

@NgModule({
  declarations: [AddCarComponent, UpdateCarComponent, AdminLayoutComponent, 
    ManageCarsComponent, ManageCarsTypeComponent, ManageUsersComponent, 
    ManageOrdersComponent, AddCarTypeComponent, AdminHomeComponent,
    UpdateUsersComponent, AddUserComponent, UpdateCarTypeComponent, UpdateOrderComponent, AddOrderComponent],

  imports: [CommonModule,  RouterModule.forChild(routes), FormsModule, MatInputModule,
     MatSelectModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule, MatDatepickerModule,
      MatProgressSpinnerModule, MatPaginatorModule
  ],
})
export class AdminModule { }




