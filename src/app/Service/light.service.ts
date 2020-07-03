import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LightService {

  constructor(private http: HttpClient) { }

  editLightArray$ = new BehaviorSubject<any>({});
  setEditLightArray(data)
  {
    this.editLightArray$.next(data);
  }

  deleteLight(id)
  {
    return this.http.delete<any>('http://localhost:8000/api/lights/' + id);
  }


  getStageSize() {
    return this.http.get<any>('http://localhost:8000/api/lights');
  }

  addLights(form) {
    const data = {
      stage_size: form.stage_size,
      client_id: form.client_id,
      price: form.price,

    };
    
    return this.http.post<any>('http://localhost:8000/api/lights', data);

  }

  


  updateLights(form) {
    const data = {
      id:form.id,
      stage_size: form.stage_size,
      client_id: form.client_id,
      price: form.price,


    };
    return this.http.post<any>('http://localhost:8000/api/lights/'+data.id,data)
  }
  
  
}
