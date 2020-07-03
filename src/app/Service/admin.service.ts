import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  getFacilities() {
    return this.http.get<any>('http://localhost:8000/api/facilities');

  }

}
