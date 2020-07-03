import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChairService {
  editChairArray$ = new BehaviorSubject<any>({});

setEditChairArray(data)
{
  this.editChairArray$.next(data);
}

  constructor(private http: HttpClient,private toastr: ToastrService, private router: Router,) { }

  getChairs()
{
  return this.http.get<any>('http://localhost:8000/api/chairs');
}
  getChairtypes() {
    return this.http.get<any>('http://localhost:8000/api/chairtypes');
  }

  getChairImage() {
    return this.http.get<any>('http://localhost:8000/api/chairtypes/image');
  }

  deleteChair(id) {
    return this.http.delete<any>('http://localhost:8000/api/chairs/' + id);
  }

  addChairs(form) {
    form.qty.forEach(element => {
      const data = {
        type: form.type,
        client_id: form.client_id,
        minQty: element.minQty,
        maxQty: element.maxQty,
        price_per_uncoveredchair: element.price_per_uncoveredchair,
        price_per_coveredchair: element.price_per_coveredchair
      };

      this.sendAPI(data).subscribe(res => {
        this.toastr.success('Chairs Added', 'Successfully Added!',
          {timeOut: 4000});;
          this.router.navigate(['/viewchair']);
        console.log(res);
      });
       
      });
   
  }

  sendAPI(data) {
    return this.http.post<any>('http://localhost:8000/api/chairs', data);
  }


  
  updatechairs(form) {
    form.qty.forEach(element => {
      const data = {
        id: element.id,
        type: form.type,
        client_id: form.client_id,
        minQty: element.minQty,
        maxQty: element.maxQty,
        price_per_uncoveredchair: element.price_per_uncoveredchair,
        price_per_coveredchair: element.price_per_coveredchair
      };

      this.sendUpdateAPI(data).subscribe(res => {
        this.toastr.success('Chairs Updated', 'Successfully Updated!',
          {timeOut: 4000});;
          this.router.navigate(['/viewchair']);
        console.log(res);
      });
    });
  }
  
  sendUpdateAPI(data) {
    
    
    return this.http.post<any>('http://localhost:8000/api/chairs/'+data.id,data)
  }

//ChairTypes

addChairtype(form)
{
  const data = {
    
    image: form.image
   

  };
  return this.http.post<any>('http://localhost:8000/api/chairtypes/',data)
}
}







