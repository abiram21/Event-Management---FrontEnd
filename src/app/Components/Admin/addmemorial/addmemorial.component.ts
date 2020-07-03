import { Component, OnInit } from '@angular/core';
import { MemorialService } from 'src/app/Service/Memorial.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addmemorial',
  templateUrl: './addmemorial.component.html',
  styleUrls: ['./addmemorial.component.css']
})
export class AddmemorialComponent implements OnInit {
  public form: FormGroup;
  memorialsArray: any[];
  imageArray: any[];
  phnArray: any[];
  flag = this.route.snapshot.queryParams['isEdit'];
  
  constructor(private _fb: FormBuilder, private memorialservice: MemorialService, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private loginservice: LoginService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.isLogin();
    if (this.route.snapshot.queryParams['isEdit']) {
      this.memorialservice.editMemorialArray$.subscribe(data=>{
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
      qty: this._fb.array([this._fb.group({ minQty: ['', [Validators.required, Validators.min(1)]], maxQty: ['', [Validators.required, Validators.min(1)]], unit_price: ['', [Validators.required, Validators.min(1)]] })])


    });

    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });
  }

    this.memorialservice.getMemorialImage().subscribe(res => {
      console.log(res);
      this.imageArray = res;
    });
 
  }

  editForm(data) {
    // tslint:disable-next-line: max-line-length
    this.qtydetails.push(this._fb.group({id: [data.id, [Validators.required, Validators.min(1)]], minQty: [data.minQty, [Validators.required, Validators.min(1)]], maxQty: [data.maxQty, [Validators.required, Validators.min(1)]], unit_price: [data.unit_price, [Validators.required, Validators.min(1)]]}));
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

  onsubmit() {
    if (this.form.valid) {
    console.log(this.form.value);
    this.memorialservice.addMemorials(this.form.value);
    }
  }

  onUpdate(){
    if (this.form.valid) {
      console.log(this.form.value);
      this.memorialservice.updateMemorials(this.form.value);
    }
  }

  
  deleteForm(index) {
    console.log('deleted detail', this.qtydetails.controls[index].value.id);
   this.memorialservice.deletetMemorials(this.qtydetails.controls[index].value.id).subscribe(res=>{
    this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewmemorial']);
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
