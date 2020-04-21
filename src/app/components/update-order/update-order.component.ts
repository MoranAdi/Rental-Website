import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car';
import { SearchCarService } from 'src/app/services/search-car.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  public order = new Order();
  public allCars: Car[];
  public disableUpdateButton = false;

  constructor(private orderService: OrdersService, private carsService: CarsService, private searchCarService: SearchCarService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Get the car id and the car Type id from server
    this.carsService.getAllCars().subscribe(cars => this.allCars = cars, err => {
      err("An unexpected error occurred");
      console.log(err);
    });
  }

  public updateOrder(): void {
    //add the parameter id to the order object
    this.order.id = this.activatedRoute.snapshot.params.id;
    //add the parameter idCar and idCarType to the order object
    if (this.order.plate != null) {
      if (this.allCars.find(x => x.plateNumber === this.order.plate) === undefined) {
        alert("This plate number doesn't exist, please try again")
        return;
      }
      else {
        this.order.idCar = this.allCars.find(x => x.plateNumber === this.order.plate).id;
        this.order.idCarType = this.allCars.find(x => x.plateNumber === this.order.plate).idCarType
      };
    }
    this.orderService.updateOrder(this.order)
      .subscribe(ct => {
        alert("Order was update");
        this.router.navigate(["/admin/manage-orders"]);
      }, err => {
        alert("An unexpected error occurred");
        console.log(err);
      })
  }
}
