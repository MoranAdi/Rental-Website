import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { SearchCar } from 'src/app/models/searchCar';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchCarService } from 'src/app/services/search-car.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  public newOrder = new Order();
  public carToRent: SearchCar;
  public daysAmount: number;
  public isLoggedIn: boolean;
  public user = (JSON.parse(localStorage.getItem("user")));
  public availableCars = null;

  //Display the date picker of pick up date start from doday
  public datepickerStartDate = new Date();
  //Display the date picker of return date start from day after the chosen pick up date
  public datepickerEndDate: Date;


  constructor(private searchCarService: SearchCarService,
    private orderService: OrdersService,
    private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //get properties  from the routing
    this.newOrder.idCar = +this.activateRoute.snapshot.params.id;
    this.newOrder.start = new Date(this.activateRoute.snapshot.queryParamMap.get('start'));
    this.newOrder.end = new Date(this.activateRoute.snapshot.queryParamMap.get('end'));

    // Check if dates are empty (if year equal 1970)
    if (this.newOrder.start.getFullYear() === 1970 && this.newOrder.end.getFullYear() === 1970) {
      this.newOrder.start = null;
      this.newOrder.end = null;
    }
    //If the dates are not null, then calculate rental days amount
    else {
      this.daysAmount = +Math.round(Math.abs((this.newOrder.start.getTime() - this.newOrder.end.getTime()) / (24 * 60 * 60 * 1000)));
    }
    if (this.user === null) {
      this.isLoggedIn = false;
    }
    else {
      this.isLoggedIn = true;
    }

    //Get all the car details that needs for adding new order.
    this.searchCarService.getAllSearches().subscribe(result => {
      for (let car of result) {
        if (car.carID === this.newOrder.idCar) {
          this.carToRent = car;
          this.newOrder.plate = car.plateNumber;
          this.newOrder.idCarType = car.idCarType
        }
      }
    }, err => {
      alert("An unexpected error occurred");
      console.log(err);
    });
  }

  //Function to ensure that the user won't choose return date earlier than pick-up date
  public setMinDateToReturnDate(): void {
    this.datepickerEndDate = new Date(this.newOrder.start);
    this.datepickerEndDate = new Date(this.datepickerEndDate.setDate(this.datepickerEndDate.getDate() + 1));
  }

  //if the user need to choose dates- after choosing return date it will calculate rental days amount(by calling this function)
  public updatePropertydaysAmount(): void {
    this.daysAmount = +Math.round(Math.abs((this.newOrder.start.getTime() - this.newOrder.end.getTime()) / (24 * 60 * 60 * 1000)));
  }

  //Get array of available cars between the choosen dates and filter by them
  public OnSearchByDates() {
    this.searchCarService.getAllAvailableCars(this.newOrder.start, this.newOrder.end)
      .subscribe(result => {
        this.availableCars = result;
        if (this.availableCars.indexOf(this.newOrder.idCar) === -1) {
          alert("We apologize this car is not available on these dates")
          this.newOrder.end = null;
          this.newOrder.start = null
        }
      }
        , err => {
          alert("An unexpected error occurred")
          console.log(err);
        }
      );
  }

  // Add the order to the database
  public addOrder(): void {
    // Only if you are logged in
    if (this.isLoggedIn) {
      this.newOrder.idUser = this.user.uId;
      this.orderService.addOrder(this.newOrder).subscribe(result => {
        alert("Your reservation was successfully booked");
        this.router.navigate(["/home"]);
      },
        err => {
          alert("An unexpected error occurred");
          console.log(err);
        })
    }
    // If you are not logged in
    else {
      alert("Please sign in or register to complete your reservation");
      this.router.navigate(["/login"],
        {
          queryParams: {
            car: this.carToRent.carID,
            start: this.newOrder.start, end: this.newOrder.end
          }
        });
    }
  }
}

