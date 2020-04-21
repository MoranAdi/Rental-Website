import { Component, Inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  public user = new User();
  public fileToUpload: File = null;
  public userID: string = null;
  imageUrl: string = "/assets/images/default-image.png"

  public today_minDate = new Date();
  public today_maxDate = new Date();
  //Driver aged must be between 18 – 85. 85*365= 31025, 18*365=6570
  public minDate = new Date(this.today_minDate.setDate(this.today_minDate.getDate() - 31025));
  public maxDate = new Date(this.today_maxDate.setDate(this.today_maxDate.getDate() - 6570));


  public constructor(private usersService: UsersService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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

  public addUser(): void {
    if (this.fileToUpload != null) {
      this.usersService.addUserWithImage(this.user, this.fileToUpload).subscribe((u) => {
        this.loginAfterRegister(u);
        alert("Added successfully!");
        this.router.navigate(["/my-orders"]);
      }, err => {
        alert("An unexpected error occurred")
        console.log(err);
      });
      this.close();
    }
    else {
      this.usersService.addUser(this.user)
        .subscribe((u) => {
          this.loginAfterRegister(u);
          alert("Added successfully!");
          this.router.navigate(["/my-orders"]);
        }, err => {
          alert("An unexpected error occurred")
          console.log(err);
        });
      this.close();
    }
  }

  public loginAfterRegister(user: User) {
    this.user.userRole = "Customer";
    this.user.uId = user.uId;
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  public close(): void {
    this.dialogRef.close();
  }
}
