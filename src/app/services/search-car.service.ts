import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchCar } from 'src/app/models/searchCar';

@Injectable({
  providedIn: 'root'
})
export class SearchCarService {

  private searchUrl = "http://localhost:49934/api/search";
  constructor(private httpClient: HttpClient) { }

  public getAllSearches():Observable<SearchCar[]>{
    return this.httpClient.get<SearchCar[]>(this.searchUrl)
  }

  public getAllAvailableCars(start: Date, end: Date):Observable<number[]>{
    const params = new HttpParams().set('start', start.toDateString()).set('end', end.toDateString());

    return this.httpClient.get<number[]>(this.searchUrl+"/available-cars", {params: params });
  }
}
