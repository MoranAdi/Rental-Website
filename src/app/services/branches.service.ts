import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Branch } from '../models/branches';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private httpClient: HttpClient) { }

  private branchUrl = "http://localhost:49934/api/branches";

  public getAllBranches(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>(this.branchUrl);
}
}

