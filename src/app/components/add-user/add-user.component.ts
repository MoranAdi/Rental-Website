import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  public user = new User();
  public fileToUpload: File = null;
  public imageUrl: string = "/assets/images/default-image.png";

  public today_minDate = new Date();
  public today_maxDate = new Date();
  //Driver aged must be between 18 – 85. 85*365= 31025, 18*365=6570
  public minDate = new Date(this.today_minDate.setDate(this.today_minDate.getDate() - 31025));
  public maxDate = new Date(this.today_maxDate.setDate(this.today_maxDate.getDate() - 6570));

  constructor(private usersService: UsersService, private router: Router) { }

  public addUser(): void {
    //add user with image
    if (this.fileToUpload != null) {
      this.usersService.addUserWithImage(this.user, this.fileToUpload).subscribe((u) => {
        alert("Added successfully!");
        this.router.navigate(["/admin/manage-users"]);
      }, err => {
        alert("An unexpected error occurred");
        console.log(err);
      });
    }
    //add user without image
    else {
      this.usersService.addUser(this.user)
        .subscribe((u) => {
          alert("Added successfully!");
          this.router.navigate(["/admin/manage-users"]);
        }, err => {
          alert("An unexpected error occurred");
          console.log(err);
        });
    }
  }

  public onFileSelect(args): void {
    this.fileToUpload = args.target.files[0];
  }

  public handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
}
