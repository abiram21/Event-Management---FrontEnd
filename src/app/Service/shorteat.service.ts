import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShorteatService {

  constructor(private http: HttpClient,private toastr: ToastrService, private router: Router,) { }
  editShorteatArray$ = new BehaviorSubject<any>({});

  setEditShorteatArray(data)
  {
    this.editShorteatArray$.next(data);
  }

  getShorteats() {
    return this.http.get<any>('http://localhost:8000/api/shorteats');

  }
  deleteShorteat(id) {
    return this.http.delete<any>('http://localhost:8000/api/shorteats/'+id);

  }

  addShorteats(form) {
    form.qty.forEach(element => {
      const data = {
        type: form.type,
        client_id: form.client_id,
        minQty: element.minQty,
        maxQty: element.maxQty,
        unit_price: element.unit_price
      };

      this.sendAPI(data).subscribe(res => {
        this.toastr.success('Shorteats Added', 'Successfully Added!',
          {timeOut: 4000});;
         
        console.log(res);
      });
    });
    this.router.navigate(['/viewshorteat']);
  }

  sendAPI(data) {
    return this.http.post<any>('http://localhost:8000/api/shorteats', data);
  }

  
  updateShorteats(form) {
    form.qty.forEach(element => {
      const data = {
        id: element.id,
        type: form.type,
        client_id: form.client_id,
        minQty: element.minQty,
        maxQty: element.maxQty,
        unit_price: element.unit_price
      };

      this.sendUpdateAPI(data).subscribe(res => {
        this.toastr.success('Shorteats Updated', 'Successfully Updated!',
        {timeOut: 4000});;
        
        console.log(res);
      });
    });
    this.router.navigate(['/viewshorteat']);
  }
  
  sendUpdateAPI(data) {
    
    
    return this.http.post<any>('http://localhost:8000/api/shorteats/' + data.id,data)
  }
}
