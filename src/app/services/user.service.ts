import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${environment.backUrl}`);
  }

  addNewUser(user:any):Observable<any>{
    return this.http.post<any>(`${environment.backUrl}`,user);
  }
  
}
