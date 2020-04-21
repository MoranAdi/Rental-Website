import { Component } from '@angular/core';
import { CarType } from 'src/app/models/carType';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsTypeService } from 'src/app/services/cars-type.service';

@Component({
  selector: 'app-update-car-type',
  templateUrl: './update-car-type.component.html',
  styleUrls: ['./update-car-type.component.css']
})
export class UpdateCarTypeComponent {
  public carType = new CarType();
  public disableButton = false;

  constructor(private activatedRoute: ActivatedRoute, private carTypeService: CarsTypeService, private router: Router) { }

  public updateCarType(): void {
    //add the parameter id to the car type object
    this.carType.id = this.activatedRoute.snapshot.params.id;
    this.carTypeService.updateCarType(this.carType)
      .subscribe(ct => {
        (alert("Car Type was update"));
        this.router.navigate(["/admin/manage-cars-type"]);
      }, err => {
        alert("An unexpected error occurred");
        console.log(err);
      })
  }
}
