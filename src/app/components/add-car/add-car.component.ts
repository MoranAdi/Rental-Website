import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchesService } from 'src/app/services/branches.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  public car = new Car();
  public allBranches = [];
  public branchNameArray = [];
  public branchName: string;
  public fileToUpload: File = null;
  public disableButton: boolean = false;
  public imageUrl: string = "/assets/images/upload-image.png";

  public carType = [
    { id: 1, name: 'Standart' },
    { id: 2, name: 'Economy' },
    { id: 3, name: 'Compact' },
    { id: 4, name: 'Premium' },
    { id: 5, name: 'Fullsize' },
    { id: 6, name: 'Luxury' },
    { id: 7, name: 'Van' },
  ]

  constructor(private carsService: CarsService, private activatedRoute: ActivatedRoute,
    private router: Router, private branchesService: BranchesService) { }

  ngOnInit() {
    // Get the branch id and the branch name from server
    this.branchesService.getAllBranches().subscribe(branch => {
      this.allBranches = branch;
      this.CreateBranchNameArray(branch);
    },
      err => {
        alert("An unexpected error occurred");
        console.log(err);
      });
  }

  //function to create a branch name array for the selection in the form.
  private CreateBranchNameArray(array): void {
    for (let i = 0; i < array.length; i++) {
      this.branchNameArray.push(array[i]["branchName"])
    }
  }

  public addCar(): void {
    //add the parameter idCarType to the car object
    this.car.idCarType = this.activatedRoute.snapshot.params.id;
    //add the parameter idbranch to the car object
    this.car.idBranch = this.allBranches.find(x => x.branchName === this.branchName).id;
    //add the car 
    this.carsService.addCar(this.car, this.fileToUpload).subscribe(o => {
      alert("Added successfully!");
      this.router.navigate(["/admin/manage-cars"])
    },
      err => {
        alert("An unexpected error occurred");
        console.log(err);
      });
  }

  public onFileSelect(args): void {
    this.disableButton = true;
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
