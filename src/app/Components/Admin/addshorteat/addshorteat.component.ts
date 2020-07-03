import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Shorteat } from 'src/app/Model/shorteat.model';
import { ShorteatService } from 'src/app/Service/shorteat.service';
import { get } from 'http';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addshorteat',
  templateUrl: './addshorteat.component.html',
  styleUrls: ['./addshorteat.component.css']
})
export class AddshorteatComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  editShorteatArray: FormArray;
  flag = this.route.snapshot.queryParams['isEdit'];


  constructor(private _fb: FormBuilder, private shorteatservice: ShorteatService, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private loginservice: LoginService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.isLogin();

    if (this.route.snapshot.queryParams['isEdit']) {
      this.shorteatservice.editShorteatArray$.subscribe(data => {
        this.form = this._fb.group({

          type: [data[0].type, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          client_id: [data[0].client_id, [Validators.required, Validators.min(1)]],
          // tslint:disable-next-line: max-line-length
          qty: this._fb.array([])

        });

        data.forEach(element => {
          this.editForm(element);

        });


      });

    }
else{
    this.form = this._fb.group({
      type: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      client_id: ['', [Validators.required, Validators.min(1)]],
      // tslint:disable-next-line: max-line-length
      qty: this._fb.array([this._fb.group({ minQty: ['', [Validators.required, Validators.min(1)]], maxQty: ['', [Validators.required, Validators.min(1)]], unit_price: ['', [Validators.required, Validators.min(1)]]})])

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
    this.qtydetails.push(this._fb.group({  minQty: ['', [Validators.required, Validators.min(1)]], maxQty: ['', [Validators.required, Validators.min(1)]], unit_price: ['', [Validators.required, Validators.min(1)]] }));
  }


  removeForm(index) {
    this.qtydetails.removeAt(index);
  }

  onsubmit() {
    if (this.form.valid) {
    console.log(this.form.value);
    this.shorteatservice.addShorteats(this.form.value);
    }
  }

  deleteForm(index) {
    console.log('deleted detail', this.qtydetails.controls[index].value);
    this.shorteatservice.deleteShorteat(this.qtydetails.controls[index].value.id).subscribe(
      res => {
        this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewshorteats']);
      }
    );
    this.qtydetails.removeAt(index);

  }

  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.shorteatservice.updateShorteats(this.form.value);
    }
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
