import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';
import { FoodServiceService } from 'src/app/Service/Food.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  editFoodArray: FormArray;
  flag = this.route.snapshot.queryParams['isEdit'];
  constructor(private _fb: FormBuilder, private foodservice: FoodServiceService,
    private clientservice: ClientService, private router: Router,
    private route: ActivatedRoute,private loginservice: LoginService,
    private toastr: ToastrService,

    ) { }

  ngOnInit() {
    this.isLogin();
   
    

    if (this.route.snapshot.queryParams['isEdit']) {
      this.foodservice.editFoodArray$.subscribe(data => {
        this.form = this._fb.group({

          name: [data[0].name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          client_id: [data[0].client_id, [Validators.required, Validators.min(1)]],
          // tslint:disable-next-line: max-line-length
          qty: this._fb.array([])

        });

        data.forEach(element => {
          this.editForm(element);

        });


      });

    }
    else {
      this.form = this._fb.group({

        name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        client_id: ['', [Validators.required, Validators.min(1)]],
        // tslint:disable-next-line: max-line-length
        qty: this._fb.array([this._fb.group({ minQty: ['', [Validators.required, Validators.min(1)]], maxQty: ['', [Validators.required, Validators.min(1)]], unit_price: ['', [Validators.required, Validators.min(1)]] })])


      });

      this.clientservice.getPhoneNumber().subscribe(res => {
        console.log(res);
        this.phnArray = res.data;
      });

    }

  }

  editForm(data) {
    // tslint:disable-next-line: max-line-length
    this.qtydetails.push(this._fb.group({ id: [data.id, [Validators.required, Validators.min(1)]], minQty: [data.minQty, [Validators.required, Validators.min(1)]], maxQty: [data.maxQty, [Validators.required, Validators.min(1)]], unit_price: [data.unit_price, [Validators.required, Validators.min(1)]] }));
  }



  get qtydetails() {
    return this.form.get('qty') as FormArray;
  }

  addForm() {
    // tslint:disable-next-line: max-line-length
    this.qtydetails.push(this._fb.group({ minQty: ['', [Validators.required, Validators.min(1)]], maxQty: ['', [Validators.required, Validators.min(1)]], unit_price: ['', [Validators.required, Validators.min(1)]] }));
  }


  removeForm(index) {
    this.qtydetails.removeAt(index);
  }

  deleteForm(index) {
    console.log('deleted detail', this.qtydetails.controls[index].value);
    this.foodservice.deleteFood(this.qtydetails.controls[index].value.id).subscribe(
      res => {
        this.toastr.success('Deleted!', 'Success!',
        {timeOut: 20000});;
          this.router.navigate(['/viewfood']);
      }
    );
    this.qtydetails.removeAt(index);

  }

  onsubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.foodservice.addFoods(this.form.value);
    }
  }

  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.foodservice.updateFoods(this.form.value);
    }
  }
  isLogin()
  {
    console.log(this.loginservice.isLogin$.value);
    if(this.loginservice.isLogin$.value)
    {
      
    }
    else{
      
      this.router.navigate(['/login']);
    }
  }


}
