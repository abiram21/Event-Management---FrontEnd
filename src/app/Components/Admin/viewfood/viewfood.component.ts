import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodServiceService } from 'src/app/Service/Food.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewfood',
  templateUrl: './viewfood.component.html',
  styleUrls: ['./viewfood.component.css']
})
export class ViewfoodComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  foodArray: any[];
  filterArray: any[];
  uniqueFood: any[];
  editArray: any[];

  constructor(private loginservice: LoginService, private fb: FormBuilder, private foodservice: FoodServiceService,
     private clientservice: ClientService, private router: Router,) { }

  ngOnInit() {
    
    this.isLogin();
  
    this.form = this.fb.group({
      phnNo: ['', [Validators.required]]

    });

    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });

    this.foodservice.getFoods().subscribe(res => {
      console.log(res);
      this.foodArray = res.data;

    });

  }

  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }
  onSubmit() {
    this.filterArray = this.foodArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(food => food.name))).map(name => {
      return this.filterArray.find(fp => fp.name === name);

    });
    console.log(array);
    this.uniqueFood = array;
  }

  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.name == data);
    console.log("food",this.editArray);
    this.router.navigate(['/addfood'], {queryParams: {  isEdit: true}});

    this.foodservice.setEditFoodArray(this.editArray);
    
  }

  isLogin()
  {
    if(this.loginservice.isLogin$.value)
    {
       
    }
    else{
      
      this.router.navigate(['/login']);
    }
  }

}
