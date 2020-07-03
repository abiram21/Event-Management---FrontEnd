import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MemorialService {

  constructor(private http: HttpClient,private toastr: ToastrService, private router: Router,) { }

  editMemorialArray$ = new BehaviorSubject<any>({});

  setEditMemorialArray(data)
  {
    this.editMemorialArray$.next(data);
  }

  getMemorials(){
    return this.http.get<any>('http://localhost:8000/api/memorials')

  }
  deletetMemorials(id){
    return this.http.delete<any>('http://localhost:8000/api/memorials/' +id)

  }


  getMemorialtype(){
    return this.http.get<any>('http://localhost:8000/api/memorialtypes')

  }

  getMemorialImage()
  {
    return this.http.get<any>('http://localhost:8000/api/memorialtypes/image');
  }

  addMemorials(form) {
    form.qty.forEach(element => {
      const data = {
        type: form.type,
        client_id: form.client_id,
        minQty: element.minQty,
        maxQty: element.maxQty,
        unit_price: element.unit_price
      };

      this.sendAPI(data).subscribe(res => {
        this.toastr.success('Memorials Added', 'Successfully Added!',
          {timeOut: 4000});;
          this.router.navigate(['/viewmemorial']);
        console.log(res);
      });
    });
  }

  sendAPI(data) {
    return this.http.post<any>('http://localhost:8000/api/memorials', data);
  }


  updateMemorials(form) {
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
        this.toastr.success('Memorials Updated', 'Successfully Updated!',
          {timeOut: 4000});;
          this.router.navigate(['/viewmemorial']);
        console.log(res);
      });
    });
  }
  
  sendUpdateAPI(data) {

    return this.http.post<any>('http://localhost:8000/api/memorials/'+data.id,data)
  }

}
