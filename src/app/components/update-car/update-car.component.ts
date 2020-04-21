import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car';
import { BranchesService } from 'src/app/services/branches.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  public car = new Car();
  public disableButton = false;
  public fileToUpload: File = null;
  public imageUrl: string = "/assets/images/upload-image.png"
  public allBranches = [];
  public branchNameArray = [];
  public branchName: string;

  public carType = [
    { id: 1, name: 'Standart' },
    { id: 2, name: 'Economy' },
    { id: 3, name: 'Compact' },
    { id: 4, name: 'Premium' },
    { id: 5, name: 'Fullsize' },
    { id: 6, name: 'Luxury' },
    { id: 7, name: 'Van' },
  ]

  constructor(private activatedRoute: ActivatedRoute, private carsService: CarsService,
    private router: Router, private branchesService: BranchesService) { }

  ngOnInit() {
    // Get the branch id and the branch name from server
    this.branchesService.getAllBranches().subscribe(branch => {
      this.allBranches = branch;
      this.CreateBranchNameArray(branch);
    },
      err => alert(err.message));
  }

  //function to create a branch name array for the selection in the form.
  private CreateBranchNameArray(array): void {
    for (let i = 0; i < array.length; i++) {
      this.branchNameArray.push(array[i]["branchName"])
    }
  }

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

  public updateCar(): void {
    //add the parameter id from the route to the car object
    this.car.id = this.activatedRoute.snapshot.params.id;
    //add the parameter idbranch to the car object
    if (this.branchName != null) {
      this.car.idBranch = this.allBranches.find(x => x.branchName === this.branchName).id;
    }
    if (this.fileToUpload != null) {
      this.carsService.updateCarWithImage(this.car, this.fileToUpload)
        .subscribe(ct => {
          (alert("Car was update"));
          this.router.navigate(["/admin/manage-cars"]);
        }, err => alert(err.message));
    }
    else {
      this.carsService.updateCar(this.car)
        .subscribe(c => {
          (alert("Car Type was update"));
          this.router.navigate(["/admin/manage-cars"]);
        }, err => {
          alert("An unexpected error occurred");
          console.log(err);
        });
    }
  }
}
