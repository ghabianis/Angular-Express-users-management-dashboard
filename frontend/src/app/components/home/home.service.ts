import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient:HttpClient) { }

   getAllUsers(){
    return this.httpClient.get('http://localhost:3000/admin/userscount/');
  }


  getAllVisitersForchart(){
    return this.httpClient.get('http://localhost:3000/admin/getalldataforchart/');
  }

  getAllVisiters(){
    return this.httpClient.get('http://localhost:3000/admin/getAllData/');
  }

  

  getAllVisits(){
    return this.httpClient.get('http://localhost:3000/admin/getallvisits/');
  }

  deleteVisiteur(id:any){
    return this.httpClient.delete(`http://localhost:3000/admin/deletevisit/${id}`)
  }
}
