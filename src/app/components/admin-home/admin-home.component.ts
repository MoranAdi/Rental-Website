import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  user: any;

  ngOnInit() {
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
  }
}
