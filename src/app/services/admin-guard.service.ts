import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  // Function for testing the role of the user and return true or false 
    // for allowing to enter to a specific route
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let user: any = localStorage.getItem("user");

      if(user === null) {
          this.router.navigate(["/login"]);
          return false;
      }

      user = JSON.parse(user);

      if(user.userRole !== "Admin") {
          this.router.navigate(["/login"]);
          return false;
      }

      return true;
  }
}
