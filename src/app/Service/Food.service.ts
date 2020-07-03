import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  public addedFoodItem$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient,private toastr: ToastrService, private router: Router,
    ) {

   }

editFoodArray$ = new BehaviorSubject<any>({});

setEditFoodArray(data)
{
  this.editFoodArray$.next(data);
}


  getFoods() {
    return this.http.get<any>('http://localhost:8000/api/foods');

  }



  deleteFood(id) {
    return this.http.delete<any>('http://localhost:8000/api/foods/'+id);

  }

  addFoods(form) {
    form.qty.forEach(element => {
      const data = {
       name: form.name,
        client_id: form.client_id,
        minQty: element.minQty,
        maxQty: element.maxQty,
        unit_price: element.unit_price
      };

      this.sendAPI(data).subscribe(res => {
        this.toastr.success('Food Added', 'Successfully Added!',
          {timeOut: 4000});;
          this.router.navigate(['/viewfood']);
        console.log(res);
      });
    });
  }

  sendAPI(data) {
    return this.http.post<any>('http://localhost:8000/api/foods', data);
  }


  updateFoods(form) {
    form.qty.forEach(element => {
      const data = {
        id: element.id,
        name: form.name,
        client_id: form.client_id,
        minQty: element.minQty,
        maxQty: element.maxQty,
        unit_price: element.unit_price
      };

      this.sendUpdateAPI(data).subscribe(res => {
        this.toastr.success('Food Updated', 'Successfully Updated!',
          {timeOut: 4000});;
          this.router.navigate(['/viewfood']);
        console.log(res);
      });
      
    });


  }

  sendUpdateAPI(data) {


    return this.http.post<any>('http://localhost:8000/api/foods/' + data.id, data)
  }
}
