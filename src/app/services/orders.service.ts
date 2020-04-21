import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  private orderUrl = "http://localhost:49934/api/orders";

  public getAllOrders():Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.orderUrl)
  }
  public getAllOrderDates():Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.orderUrl+"/dates")
  }

  public getOneOrder(orderNumber: string):Observable<Order>{
    return this.httpClient.get<Order>(this.orderUrl+ "/" + orderNumber)
  }

  public getUserOrders(userID: number):Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.orderUrl + "/orders/" + userID)
  }

  public addOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>(this.orderUrl, order);
}
public updateOrder(order: Order): Observable<Order>{
  return this.httpClient.put<Order>(this.orderUrl+"/"+ order.id, order);
}

public deleteOrder(id: number): Observable<undefined> {
  return this.httpClient.delete<undefined>(this.orderUrl + "/" + id);
}


}
