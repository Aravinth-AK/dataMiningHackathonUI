import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  private baseUrl:string;
  constructor(private http:HttpClient) { 
    this.baseUrl="http://localhost:2020/api/hackathon/"
  };

  public saveThesisData(payload){
     return this.http.post(this.baseUrl+'addThesis',payload);
  };

 public loginUser(payload): Observable<any>{
    return this.http.post(this.baseUrl+'login',payload);
 }

 public getTotalCount(payload){
  return this.http.post(this.baseUrl+'totalCount',payload);
};

public postNewUser(payload){
  return this.http.post(this.baseUrl+'signup',payload);
};


}
