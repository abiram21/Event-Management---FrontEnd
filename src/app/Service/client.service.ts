import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  editClientArray$ = new BehaviorSubject<any>({});
  setEditclientArray(data)
  {
    this.editClientArray$.next(data);
  }

  getPhoneNumber() {
    return this.http.get<any>('http://localhost:8000/api/clients');
  }
  addClient(form) {
    const data = {
     name: form.name,
      address: form.address,
      description: form.description,
      email: form.email,
      phoneNo: form.phone,

    };
    return this.http.post<any>('http://localhost:8000/api/clients', data);

    

  }

 

  updateClient(form) {
    console.log(form.id);
    
    const data = {
      id:form.id,
      name: form.name,
      address: form.address,
      description: form.description,
      email: form.email,
      phoneNo: form.phone,
      

    };
    return this.http.post<any>('http://localhost:8000/api/clients/'+data.id,data)

    
  }


  deleteClient(id) {
    return this.http.delete<any>('http://localhost:8000/api/clients/'+id);

  }



  viewFoodClient(foodName, foodQty) {
    return this.http.get<any>('http://localhost:8000/api/foods/getclient/' + foodName + '/' + foodQty);


  }
  viewMemorialClient(memorialType, memorialQty) {
    return this.http.get<any>('http://localhost:8000/api/memorials/getclient/' + memorialType + '/' + memorialQty);


  }



  viewChairClient(type, uncoveredChairs, coveredChairs) {
    return this.http.get<any>('http://localhost:8000/api/chairs/getclient/' + type + '/' + uncoveredChairs + '/' + coveredChairs);

  }


  viewHallcoverClient(size) {
    return this.http.get<any>('http://localhost:8000/api/hallcovers/getclient/' + size);

  }

  viewLightClient(size) {
    return this.http.get<any>('http://localhost:8000/api/lights/getclient/' + size);

  }

  viewSoundClient(size, type) {
    return this.http.get<any>('http://localhost:8000/api/sounds/getclient/' + size + '/' + type);

  }

  viewShorteatClient(shorteattype, shorteatQty) {
    return this.http.get<any>('http://localhost:8000/api/shorteats/getclient/' + shorteattype + '/' + shorteatQty);

  }


 viewPhotographyClient(duration) {
    return this.http.get<any>('http://localhost:8000/api/photographies/getclient/' + duration);

  }


}
