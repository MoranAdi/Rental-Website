import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent {

  public user = new User();
  public disableButton = false;
  public fileToUpload: File = null;
  public imageUrl: string = "/assets/images/default-image.png"

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService, private router: Router) { }

  //when image selected
  public onFileSelect(args): void {
    this.disableButton = true;
    this.fileToUpload = args.target.files[0];
  }

  //Show image preview
  public handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  public updateUser(): void {
    //add the parameter id from the route to the user object
    this.user.id = this.activatedRoute.snapshot.params.id;
    // If User choose to update image
    if (this.fileToUpload != null) {
      this.userService.updateUserWithImage(this.user, this.fileToUpload)
        .subscribe(ct => {
          (alert("User was update"));
          localStorage.setItem('user', JSON.stringify(ct));

          this.router.navigate(["/admin/manage-users"]);
        }, err => {
          alert("An unexpected error occurred");
          console.log(err);
        });
    }
    // If User didn't choose to update image
    else {
      this.userService.updateUser(this.user)
        .subscribe(user => {
          (alert("user was update"));
          this.router.navigate(["/admin/manage-users"])
            , err => {
              alert("An unexpected error occurred");
              console.log(err);
            };
        });
    }
  }
}
