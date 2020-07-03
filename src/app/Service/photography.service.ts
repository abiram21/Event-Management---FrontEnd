import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotographyService {

  constructor(private http: HttpClient) { }

  editPhotographyArray$ = new BehaviorSubject<any>({});
  setEditPhotographyArray(data)
  {
    this.editPhotographyArray$.next(data);
  }


  getPhotography() {
    return this.http.get<any>('http://localhost:8000/api/photographies');
  }

  deletePhotography(id)
  {
    return this.http.delete<any>('http://localhost:8000/api/photographies/' + id);
  }
  addPhotography(form) {

    const data = {
      day: form.day,
      client_id: form.client_id,
      price: form.price,

    };
    return this.http.post<any>('http://localhost:8000/api/photographies', data);

  }

  

  updatePhotography(form) {
    const data = {
      id:form.id,
      duration: form.day,
      client_id: form.client_id,
      price: form.price,


    };
    return this.http.post<any>('http://localhost:8000/api/photographies/'+data.id,data)

     
    
  }
  
}
