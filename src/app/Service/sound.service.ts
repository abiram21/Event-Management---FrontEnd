import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private http: HttpClient) { }
  editSoundArray$ = new BehaviorSubject<any>({});
  setEditSoundArray(data)
  {
    this.editSoundArray$.next(data);
  }

  deleteSound(id)
  {
    return this.http.delete<any>('http://localhost:8000/api/sounds/' + id);
  }

  
  getStageSize() {
    return this.http.get<any>('http://localhost:8000/api/sounds');
  }

  addSounds(form) {

    const data = {
      place_type: form.place_type,
      stage_size: form.stage_size,
      client_id: form.client_id,
      price: form.price,

    };
    return this.http.post<any>('http://localhost:8000/api/sounds', data);
    

  }

  

  updateSound(form) {
    const data = {
      id:form.id,
      place_type: form.place_type,
      stage_size: form.stage_size,
      client_id: form.client_id,
      price: form.price


    };

    return this.http.post<any>('http://localhost:8000/api/sounds/'+data.id,data)
      
    
  }
  
  
}
