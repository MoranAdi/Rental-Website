import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/credentials';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public user: User;
  

  constructor(private httpClient: HttpClient) { }

  private userUrl = "http://localhost:49934/api/users";

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl);
}

  public logIn(credentials: Credentials): Observable<User> {
    return this.httpClient.post<User>(this.userUrl + "/" + "log-in", credentials);
  }

  public addUserWithImage(user: User, file: File): Observable<User> {
    const formData: FormData = new FormData();
   formData.append('Image', file, file.name );
    formData.append('User', JSON.stringify(user));
    return this.httpClient.post<User>(this.userUrl + "/image", formData);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.userUrl, user);
  }

  public deleteUser(uid: number): Observable<undefined> {
    return this.httpClient.delete<undefined>(this.userUrl +"/" + uid);
  } 

  public updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(this.userUrl+"/"+ user.id, user);
  }

  public updateUserWithImage(user: User, file: File): Observable<User>{
    const formData: FormData = new FormData();
   formData.append('Image', file, file.name );
    formData.append('User', JSON.stringify(user));
    return this.httpClient.put<User>(this.userUrl+"/image/"+ user.id, formData);
  }



}
  