import { Component } from '@angular/core';
import { CarsTypeService } from 'src/app/services/cars-type.service';
import { CarType } from 'src/app/models/carType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car-type',
  templateUrl: './add-car-type.component.html',
  styleUrls: ['./add-car-type.component.css']
})

export class AddCarTypeComponent {

  public carType = new CarType();

  manufacturer = [
    { id: 1, name: 'Honda' },
    { id: 2, name: 'Hyundai' },
    { id: 3, name: 'Kia' },
    { id: 4, name: 'Mazda' },
    { id: 5, name: 'Opel' },
    { id: 6, name: 'BMW' }
  ]

  model = [
    { id: 1, name: 'Civic' },
    { id: 2, name: 'i20' },
    { id: 3, name: 'iX35' },
    { id: 4, name: 'Picanto' },
    { id: 5, name: 'Stonic' },
    { id: 6, name: 'Mokka' },
    { id: 7, name: 'I320' },
    { id: 8, name: 'I520' },
    { id: 9, name: '3' }
  ]

  carShiftGear = [
    { id: 1, name: 'Automatic' },
    { id: 2, name: 'Manual' }
  ]
  public constructor(private carsTypeService: CarsTypeService, private router: Router) { }

  public addCarType(): void {
    this.carsTypeService.addCarType(this.carType).subscribe(o => {
      alert("Added successfully!");
      this.router.navigate(["/admin/manage-cars-type"])
    },
      err => {
        alert("An unexpected error occurred")
        console.log(err)
      });
  }
}

