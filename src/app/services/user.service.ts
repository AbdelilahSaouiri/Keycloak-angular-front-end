import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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

  updateUser(user:any):Observable<any>{

    return this.http.put<any>(`${environment.backUrl}`,user);
  }

  deleteUser(user:any):Observable<HttpResponse<any>>{
    const params= new HttpParams().set("userId",user['userId'])
    return this.http.delete(`${environment.backUrl}`,{params,observe:'response'})
  }
  
  consulterUser(userId:string):Observable<any>{
    return  this.http.get<any>(`${environment.backUrl}/${userId}`);
  }
}
