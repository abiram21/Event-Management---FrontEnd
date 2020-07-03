import { Component, OnInit } from '@angular/core';
import { FoodServiceService } from 'src/app/Service/Food.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { state } from '@angular/animations';




@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})


export class FoodComponent implements OnInit {

  foodsArray: any[];
  public form: FormGroup;


  constructor(private foodservice: FoodServiceService, private _fb: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.form = this._fb.group({
      foodPreference: ['', Validators.required],
      foodQty: ['', [Validators.required, Validators.min(1)]]
    });

    this.foodservice.getFoods().subscribe(res => {
      const foodsArray1 = res.data;

      const array = Array.from(new Set(foodsArray1.map(food => food.name))).map(name => {
        return foodsArray1.find(fp => fp.name === name);

      });
      console.log(array);
      this.foodsArray = array;
    });
  }


  // getErrorMessage() {

  //   return this.form.get("foodQty").hasError('required') ? 'You must enter a value' :
  //   this.form.get("foodQty").hasError('min') ? 'Not a valid QTY' :
  //   "";
  // }



  save() {
    if (this.form.valid) {
      // tslint:disable-next-line: max-line-length
      this.router.navigate(['/viewClient'], { queryParams: { foodname: this.form.get('foodPreference').value, foodQty: this.form.get('foodQty').value, clickbutton: 'food' } });
    }
  

  }

}
