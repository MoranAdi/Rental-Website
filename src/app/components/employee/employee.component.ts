import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  public orderNumber: string;
  public orderFound: Order;
  public showOrder = false;
  public showTotalPrice = false;
  public daysAmount: number;
  public overdueDays: number;
  public isOverdue: boolean;
  public totalPriceWithOverdue: number;
  public hideButton = false;

  constructor(private orderService: OrdersService, private router: Router) { }

  //Get orser details from database
  public findOrder(): void {
    this.orderService.getOneOrder(this.orderNumber).subscribe(order => {
      this.orderFound = order;
      this.showOrder = true;
      this.daysAmount = +Math.round(Math.abs((new Date(this.orderFound.start).getTime() - new Date(this.orderFound.end).getTime()) / (24 * 60 * 60 * 1000)));
      console.log(this.daysAmount);
    }
      , (err: Response) => {
        if (err.status === 404) {
          alert("Order does not exist")
        }
        else {
          alert("An unexpected error occurred")
          console.log(err);
        }
      });
  }

  public UpdateActualReturn(): void {
    // Set the actual Return date for today
    this.orderFound.actualEnd = new Date();
    // Check that the actual Return date is not earlier than the pick up date
    if (new Date(this.orderFound.actualEnd).getTime() >= new Date(this.orderFound.start).getTime()) {
      this.orderFound.statusOrder = "Close";
      //Update "actual return date" to existing order
      this.orderService.updateOrder(this.orderFound).subscribe(update => {
        alert("Car was returned");
        this.showTotalPrice = true;
        this.hideButton = true;
        this.overdueDays = +Math.round(Math.abs((new Date(this.orderFound.end).getTime() -
          new Date(this.orderFound.actualEnd).getTime()) / (24 * 60 * 60 * 1000)));
        // check if there is a delay in returning car date and if so calculate the total price
        if (this.overdueDays > 0) {
          this.isOverdue = true;
          this.totalPriceWithOverdue = (this.orderFound.dayPrice * this.daysAmount) +
            (this.overdueDays * this.orderFound.dayOverduePrice);
        }
        else {
          this.isOverdue = false;
        }
      }, err => {
        alert("An unexpected error occurred");
        console.log(err);
      })
    }
    else {
      alert("Please note that the return date can't be earlier than the pick up date")
    }
  }

  // function to let the employee start over(by clicking on "back" button)
  public refreshButton(): void {
    location.reload();
  }
}


