import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarType } from 'src/app/models/carType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsTypeService {

  constructor(private httpClient: HttpClient) { }

  private carTypeUrl = "http://localhost:49934/api/cars-type";

  public getAllCarsType(): Observable<CarType[]> {
    return this.httpClient.get<CarType[]>(this.carTypeUrl);
}
  
  public addCarType(carType: CarType): Observable<CarType>{
    return this.httpClient.post<CarType>(this.carTypeUrl, carType);
}

public updateCarType(carType: CarType): Observable<CarType>{
  return this.httpClient.put<CarType>(this.carTypeUrl+"/"+ carType.id, carType);
}

public deleteCarType(id: number): Observable<undefined> {
  return this.httpClient.delete<undefined>(this.carTypeUrl + "/" + id);
}
}
