import { Component, OnInit } from '@angular/core';
import { ChairService } from 'src/app/Service/chair.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addchair',
  templateUrl: './addchair.component.html',
  styleUrls: ['./addchair.component.css']
})
export class AddchairComponent implements OnInit {
  public form: FormGroup;
  chairArray: any[];
  imageArray: any[];
  phnArray: any[];
  flag = this.route.snapshot.queryParams['isEdit'];

  constructor(private _fb: FormBuilder, private chairservice: ChairService, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private loginservice: LoginService,
    private toastr: ToastrService,

    ) { }

  ngOnInit() {
    this.isLogin();
    if (this.route.snapshot.queryParams['isEdit']) {
      this.chairservice.editChairArray$.subscribe(data=>{
        this.form = this._fb.group({
          
          type: [data[0].type, [Validators.required]],
          client_id: [data[0].client_id, [Validators.required, Validators.min(1)]],
          // tslint:disable-next-line: max-line-length
          qty: this._fb.array([])

        });
        
        data.forEach((element: any) => {
         this.editForm(element);
        
        });

      
      });
    }
else{
    this.form = this._fb.group({
      type: ['', [Validators.required]],
      client_id: ['', [Validators.required, Validators.min(1)]],
      // tslint:disable-next-line: max-line-length
      qty: this._fb.array([this._fb.group({ minQty: ['', [Validators.required, Validators.min(1)]], maxQty: ['', [Validators.required, Validators.min(1)]], price_per_uncoveredchair: ['', [Validators.required, Validators.min(1)]], price_per_coveredchair: ['', [Validators.required, Validators.min(1)]] })])


    });

    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });
  }

    this.chairservice.getChairtypes().subscribe(res => {
      console.log(res);
      this.chairArray = res.data;
    });

    this.chairservice.getChairImage().subscribe(res => {
      console.log('Image => ', res);
      this.imageArray = res;
    });
  

  }
  editForm(data: { id: any; minQty: any; maxQty: any; price_per_uncoveredchair: any; price_per_coveredchair: any; }) {
    // tslint:disable-next-line: max-line-length
    this.qtydetails.push(this._fb.group({id: [data.id, [Validators.required, Validators.min(1)]],  minQty: [data.minQty, [Validators.required, Validators.min(1)]], maxQty: [data.maxQty, [Validators.required, Validators.min(1)]], price_per_uncoveredchair: [data.price_per_uncoveredchair, [Validators.required, Validators.min(1)]], price_per_coveredchair: [data.price_per_coveredchair, [Validators.required, Validators.min(1)]] }));
  }

  get qtydetails() {
    return this.form.get('qty') as FormArray;
  }

  addForm() {
    // tslint:disable-next-line: max-line-length
    this.qtydetails.push(this._fb.group({  minQty: ['', [Validators.required, Validators.min(1)]], maxQty: ['', [Validators.required, Validators.min(1)]], price_per_uncoveredchair: ['', [Validators.required, Validators.min(1)]], price_per_coveredchair: ['', [Validators.required, Validators.min(1)]] }));
  }


  removeForm(index: number) {
    this.qtydetails.removeAt(index);
  }

  onsubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.chairservice.addChairs(this.form.value);
    }

  }

  onUpdate(){
    if (this.form.valid) {
      console.log(this.form.value);
      this.chairservice.updatechairs(this.form.value);
    }
  }

  
  deleteForm(index) {
    console.log('deleted detail', this.qtydetails.controls[index].value.id);
   this.chairservice.deleteChair(this.qtydetails.controls[index].value.id).subscribe(res=>{
    this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewchair']);
   });
    this.qtydetails.removeAt(index);

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
