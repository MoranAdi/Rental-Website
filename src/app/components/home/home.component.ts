import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  public user: any;
  public isLoggedIn: boolean;

  ngOnInit() {
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    if(this.user === null) {
      this.isLoggedIn = false;
    }
    else{
      this.isLoggedIn = true;
    }
  }
}
