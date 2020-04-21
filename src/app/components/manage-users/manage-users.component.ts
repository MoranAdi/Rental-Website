import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/user";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.css"],
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = [
    "fullName",
    "id",
    "birthdate",
    "userName",
    "gender",
    "email",
    "role",
    "update",
    "delete",
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public allUsers: User[];
  public ok: boolean = true;

  constructor(private usersService: UsersService) { }

  public ngOnInit() {
    this.usersService.getAllUsers().subscribe(
      (users) => {
        this.allUsers = users;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.allUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        alert("An unexpected error occurred");
        console.log(err);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteUser(uid: number, fName: string, lName: string): void {
    if (confirm(`Are you sure you want to delete the user ${fName} ${lName}?`)) {
      this.usersService.deleteUser(uid).subscribe(
        (u) => {
          alert("User successfully deleted");
          this.ngOnInit();
        },
        (err: Response) => {
          if (err.status === 409) {
            alert("This user can't be deleted");
          } else {
            alert("An unexpected error occurred");
            console.log(err);
          }
          this.ok = false;
        }
      );
    }
  }
}
