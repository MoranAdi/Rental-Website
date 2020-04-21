import { Component, DoCheck } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements DoCheck {
  public isLoggedIn: boolean;
  public isUser: boolean;
  public isAdmin: boolean;
  public isEmployee: boolean;
  public userImg: string = "/assets/images/default-image.png";

  constructor(public dialog: MatDialog) {}

  // Open dialog when click on register
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: "800px",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngDoCheck(): void {
    this.userImg = "/assets/images/default-image.png";
    let user: any = localStorage.getItem("user");

    if (user === null) {
      this.isLoggedIn = false;
      this.isUser = false;
      this.isAdmin = false;
      this.isEmployee = false;
      return;
    }

    // Convert the string into a user object:
    user = JSON.parse(user);
    // Check if the user have image
    if (user.userPhoto != null) {
      this.userImg = `http://localhost:49934//Uploads/${user.userPhoto}`;
    }

    // Check the user role
    if (user.userRole === "Customer") {
      this.isLoggedIn = true;
      this.isUser = true;
      this.isAdmin = false;
      this.isEmployee = false;
      return;
    }
    if (user.userRole === "Admin") {
      this.isLoggedIn = true;
      this.isUser = false;
      this.isAdmin = true;
      this.isEmployee = false;
      return;
    }
    if (user.userRole === "Employee") {
      this.isLoggedIn = true;
      this.isUser = false;
      this.isAdmin = false;
      this.isEmployee = true;
      return;
    }
  }
}
