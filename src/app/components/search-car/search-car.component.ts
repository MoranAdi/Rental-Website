import { Component, OnInit } from '@angular/core';
import { SearchCarService } from 'src/app/services/search-car.service';
import { SearchCar } from 'src/app/models/searchCar';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent implements OnInit {

  public allCars: SearchCar[];
  public filteredCars: SearchCar[];
  public ok: boolean = true;
  public okFilteredCars: boolean = true;
  public availableCars = null;
  public myLocalStorage = [];

  // properties to save unique arrays
  public manufacturerArray = [];
  public modelArray = [];
  public manufacturerYearArray = [];

  // araay that holds the searches values:
  public filter: any = {
    manufacturer: "",
    model: "",
    manufacturerYear: "",
    transmission: "",
    startDate: 0,
    endDate: 0
  };

  //Display the date picker of pick up date start from doday
  public datepickerStartDate = new Date();
  //Display the date picker of return date start from day after the chosen pick up date
  public datepickerEndDate: Date;

  constructor(private searchCarService: SearchCarService, private ordersService: OrdersService) { }

  ngOnInit() {
    //get all fields of searchCar model from database
    this.searchCarService.getAllSearches().subscribe(result => {
      this.allCars = result;
      //Filter only cars that are rentable
      this.allCars = this.allCars.filter(x => {
        if (x["isRentable"]) {
          return true;
        }
        else {
          return false;
        }
      });
      this.filteredCars = this.allCars;
      //Call a function that create the filters with unique values
      this.createFilters();

      this.ReadLocalStorage();
    }, err => {
      alert("An unexpected error occurred");
      console.log(err);
      this.ok = false;
    });
  }

  //function that use the map method to fill the arrays with unique values(removes duplicates)
  MapFilter(cars, property): [] {
    let filtered = cars
      .map(car => car[property])
      .filter((value, index, arr) => arr.indexOf(value) === index);
    return filtered;
  }

  createFilters() {
    this.manufacturerArray = this.MapFilter(this.allCars, 'manufacturer');
    this.modelArray = this.MapFilter(this.allCars, 'model');
    this.manufacturerYearArray = this.MapFilter(this.allCars, 'manufacturerYear');
  }

  // filter in all filters after we select a value
  filterAllFilters() {
    this.manufacturerArray = this.MapFilter(this.filteredCars, 'manufacturer');
    this.modelArray = this.MapFilter(this.filteredCars, 'model');
    this.manufacturerYearArray = this.MapFilter(this.filteredCars, 'manufacturerYear');
  }

  public resetAllFilters() {
    this.filteredCars = this.allCars;
    this.createFilters();
    this.filter = {
      manufacturer: "",
      model: "",
      manufacturerYear: "",
      transmission: "",
      startDate: 0,
      endDate: 0
    };
  }

  //Change true/false to Rentable/Not Rentable
  public Rentable(isRentable): string {
    if (isRentable)
      return 'Rentable'
    else
      return 'Not Rentable'
  }

  // Search function by the filters
  public onSearch(property, value): void {
    this.filteredCars = this.filteredCars.filter(x => {
      if (x[property].includes(value)) {
        return true;
      }
      else {
        return false;
      }
    });
    this.filterAllFilters();
  }

  // function for search only by Keyword
  public filterByKeyWord(value: string): void {
    if (value) {
      this.filteredCars = this.filteredCars.filter(x =>
        x.manufacturer.toLowerCase().includes(value.toLowerCase()) ||
        x.model.toLowerCase().includes(value.toLowerCase()) ||
        x.manufacturerYear.includes(value) ||
        x.carType.toLowerCase().includes(value.toLowerCase()) ||
        x.carShiftGear.toLowerCase().includes(value.toLowerCase()))
      this.filterAllFilters();
    }
    else {
      this.filteredCars = this.allCars;
    }
  }

  //Function to ensure that the user won't choose return date earlier than pick-up date
  public setMinDateToReturnDate(): void {
    this.datepickerEndDate = new Date(this.filter.startDate);
    this.datepickerEndDate = new Date(this.datepickerEndDate.setDate(this.datepickerEndDate.getDate() + 1))
  }

  //Get array of available cars between the choosen dates and filter by them
  public OnSearchByDates() {
    this.searchCarService.getAllAvailableCars(this.filter.startDate, this.filter.endDate)
      .subscribe(result => {
        this.availableCars = result;
        this.filteredCars = this.filteredCars.filter((value, index, arr) => {
          if (this.availableCars.indexOf(value.carID) >= 0) {
            return true;
          }
        });
      }
        , err => {
          alert("An unexpected error occurred")
          console.log(err);
        }
      );
  }

  // Function to save searches in local storage
  public writeLocalStorage(searchcarId: number) {
    const history = JSON.parse(localStorage.getItem('watchedCars') || '[]');
    let updatedHistory = []

    if (history.indexOf(searchcarId) == -1) {
      //Save search at the beginning of the array
      history.unshift(searchcarId);
      // If the array's length is bigger than 5, remove one item from the end of the array
      if (history.length > 5) {
        history.pop();
      }
    }
    updatedHistory = history;
    localStorage.setItem('watchedCars', JSON.stringify(updatedHistory));
  }

  //function to read from local storage
  public ReadLocalStorage(): void {
    let readLocalStorage = localStorage.getItem("watchedCars");
    if (readLocalStorage == null) {
      return;
    }
    readLocalStorage = JSON.parse(readLocalStorage);

    for (let i = 0; i < this.allCars.length; i++) {
      for (let item of readLocalStorage) {
        if (this.allCars[i].carID === +item) {
          //fill myLocalStorage array so we could display the cars at the bottom of the page
          this.myLocalStorage.push(this.allCars[i]);
        }
      }
    }
  }
}



