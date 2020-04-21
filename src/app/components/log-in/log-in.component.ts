import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],

})

export class LogInComponent implements OnInit {
  public invalidLogin: boolean;
  public credentials = new Credentials();
  public user: User;
  public start: Date;
  public end: Date;
  public carId: number;

  constructor(private usersService: UsersService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.start = new Date(this.activateRoute.snapshot.queryParamMap.get('start'));
    this.end = new Date(this.activateRoute.snapshot.queryParamMap.get('end'));
    this.carId = +this.activateRoute.snapshot.queryParamMap.get('car');
  }

  public logIn(): void {
    // Get the user details from database
    this.usersService.logIn(this.credentials).subscribe(user => {
      this.user = user;
      if (this.user != null) {
        this.invalidLogin = false;
        localStorage.setItem("user", JSON.stringify(this.user));
        if (this.user.userRole === "Customer") {
          //Send the user back to /orderDetails if we got his carId in the routing.
          if (this.carId) {
            this.router.navigate(["/orderDetails", this.carId],
            { queryParams: {start: this.start, end: this.end}});
          }
          else {
            this.router.navigate(["/my-orders"]);
          }
        }
        else if (this.user.userRole === "Admin") {
          this.router.navigate(["admin/admin-home"]);
        }
        else if (this.user.userRole === "Employee") {
          this.router.navigate(["/employee"]);
        }
      }
      else {
        this.invalidLogin = true;
        alert("Invalid user name and/or password \nPlease try again")
      }
    },
      err => {
        alert("An unexpected error occurred");
        console.log(err);
      });
  }
}
