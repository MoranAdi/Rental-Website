import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) { }
  private carUrl = "http://localhost:49934/api/cars";

  public getAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.carUrl);
}

public addCar(car: Car, file: File): Observable<Car>{
  const formData: FormData = new FormData();
  formData.append('Image', file, file.name );
  formData.append('Car', JSON.stringify(car));
  return this.httpClient.post<Car>(this.carUrl, formData);
}

public updateCarWithImage(car: Car, file: File): Observable<Car>{
  const formData: FormData = new FormData();
  formData.append('Image', file, file.name );
  formData.append('Car', JSON.stringify(car));
  return this.httpClient.put<Car>(this.carUrl+"/image/"+ car.id, formData);
}

public updateCar(car: Car): Observable<Car>{
  return this.httpClient.put<Car>(this.carUrl + "/" + car.id, car);
}

public deleteCar(id: number): Observable<undefined> {
  return this.httpClient.delete<undefined>(this.carUrl + "/" + id);
}
}

