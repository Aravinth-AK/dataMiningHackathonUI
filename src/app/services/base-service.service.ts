import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  private baseUrl:string;
  constructor(private http:HttpClient) { 
    this.baseUrl="http://localhost:2020/api/hackathon/"
  };

  saveThesisData(payload){
     return this.http.post(this.baseUrl+'addThesis',payload);
  };

}
