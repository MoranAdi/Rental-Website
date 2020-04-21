import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderNumber', 'model', 'pick-up', 'return', 'actual', 'name', 'plateNumber', 'statusOrder', 'update', 'delete'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public allOrders: Order[];
  public ok: boolean = true;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe(orders => {
      this.allOrders = orders;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.allOrders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      err => {
        alert("An unexpected error occurred");
        console.log(err);
        this.ok = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteOrder(id: number, orderNum: string): void {
    if (confirm(`Are you sure you want to delete order number ${orderNum}?`)) {
      this.ordersService.deleteOrder(id)
        .subscribe(o => {
          alert("Order successfully deleted");
          this.ngOnInit();
        }
          , err => {
            alert("An unexpected error occurred");
            console.log(err);
          });
    }
  }
}
