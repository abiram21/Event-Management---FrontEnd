import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HallcoverService {
  
  constructor(private http: HttpClient) { }
 
  editHallcoverArray$ = new BehaviorSubject<any>({});
  setEditHallcoverArray(data)
  {
    this.editHallcoverArray$.next(data);
  }

  deleteHallcovers(id)
  {
    return this.http.delete<any>('http://localhost:8000/api/hallcovers/' + id);
  }

  getHallSize() {
    return this.http.get<any>('http://localhost:8000/api/hallcovers');
  }

  addHallcovers(form) {

    const data = {
      hall_size: form.hall_size,
      client_id: form.client_id,
      colors: form.colors,
      price: form.price,

    };
    return this.http.post<any>('http://localhost:8000/api/hallcovers', data);

    

  }
  
  updateHallcovers(form) {
    console.log(form.id);
    
    const data = {
      id:form.id,
      hall_size: form.hall_size,
      client_id: form.client_id,
      colors: form.colors,
      price: form.price,

    };
    return this.http.post<any>('http://localhost:8000/api/hallcovers/'+data.id,data)
  }
  
}
