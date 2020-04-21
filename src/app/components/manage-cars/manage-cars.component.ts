import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';
import { SearchCarService } from 'src/app/services/search-car.service';
import { SearchCar } from 'src/app/models/searchCar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})
export class ManageCarsComponent implements OnInit {
  displayedColumns: string[] = ['brand', 'plateNumber', 'carType', 'mileage', 'image', 'branchName', 'isRentable', 'update', 'delete'];
  dataSource: MatTableDataSource<SearchCar>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public allCars: SearchCar[];
  public ok: boolean = true;

  constructor(private searchCarService: SearchCarService, private carsService: CarsService) { }

  ngOnInit() {
    this.searchCarService.getAllSearches().subscribe(cars => {
      this.allCars = cars;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.allCars);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
      , err => { alert(err.message); this.ok = false; })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteCar(id: number, plate: string): void {
    if (confirm(`Are you sure you want to delete car number ${plate}?`)) {

      this.carsService.deleteCar(id)
        .subscribe(c => { alert("Car successfully deleted"); this.ngOnInit(); }
          , (err: Response) => {
            if (err.status === 409) {
              alert("This car can't be deleted")
            }
            else {
              alert("An unexpected error occurred")
              console.log(err);
            }
          });
    }
  }

  public Rentable(isRentable): string {
    if (isRentable)
      return 'Rentable'
    else
      return 'Not Rentable'
  }
}

