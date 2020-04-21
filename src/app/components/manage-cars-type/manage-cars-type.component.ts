import { Component, OnInit, ViewChild } from '@angular/core';
import { CarsTypeService } from 'src/app/services/cars-type.service';
import { CarType } from 'src/app/models/carType';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-manage-cars-type',
  templateUrl: './manage-cars-type.component.html',
  styleUrls: ['./manage-cars-type.component.css']
})
export class ManageCarsTypeComponent {
  displayedColumns: string[] = ['manufacturer', 'model', 'dayPrice', 'dayOverduePrice', 'manufacturerYear', 'transmision', 'update', 'delete', 'add'];
  dataSource: MatTableDataSource<CarType>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public allCarsType: CarType[];
  public ok: boolean = true;

  constructor(private carTypeService: CarsTypeService) { }

  public ngOnInit() {
    this.carTypeService.getAllCarsType().subscribe(carsType => {
      this.allCarsType = carsType;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.allCarsType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      err => {
        alert("An unexpected error occurred");
        console.log(err);
        this.ok = false;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteCarType(id: number, manufacturer: string, model: string, year: string): void {
    if (confirm(`Are you sure you want to delete car type\n${manufacturer} ${model} ${year}?`)) {
      this.carTypeService.deleteCarType(id)
        .subscribe(ct => { alert("Car Type successfully deleted"); this.ngOnInit(); }
          , (err: Response) => {
            if (err.status === 409) {
              alert("This car type can't be deleted")
            }
            else {
              alert("An unexpected error occurred")
              console.log(err);
            }
          });
    }
  }
}


