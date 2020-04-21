import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { User } from 'src/app/models/user';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
})
export class CustomerOrdersComponent implements OnInit {
  public user: User;
  public userOrders: Order[];
  public ok: boolean = true;

  public dataSource: Order[]; 
  displayedColumns  = ['orderNumber', 'model', 'pick-up', 'return', 'actual', 'plate', 'statusOrder'];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.ordersService.getUserOrders(this.user.uId).subscribe(orders => {this.userOrders = orders;
      this.dataSource= orders}, err => {
      alert("An unexpected error occurred");
      console.log(err);
      this.ok = false;
    }
    )
  }
}
