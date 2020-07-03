import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { HallcoverService } from 'src/app/Service/hallcover.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addhallcover',
  templateUrl: './addhallcover.component.html',
  styleUrls: ['./addhallcover.component.css']
})
export class AddhallcoverComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  editFoodArray: FormArray;
  flag = this.route.snapshot.queryParams['isEdit'];
  constructor(private _fb: FormBuilder, private hallcoverservice: HallcoverService, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.isLogin();
    if (this.route.snapshot.queryParams['isEdit']) {
      this.hallcoverservice.editHallcoverArray$.subscribe(data => {
        this.form = this._fb.group({
          id:[data[0].id,[Validators.required, Validators.min(1)]],
          hall_size: [data[0].hall_size, [Validators.required]],
          colors: [data[0].colors, [Validators.required, Validators.pattern('[a-zA-Z, ]*')]],
          client_id: [data[0].client_id, [Validators.required, Validators.min(1)]],
          price: [data[0].price, [Validators.required, Validators.min(1)]],

        });


      });

    }
    else {
      this.form = this._fb.group({
        hall_size: ['', [Validators.required]],
        colors: ['', [Validators.required, Validators.pattern('[a-zA-Z, ]*')]],
        client_id: ['', [Validators.required, Validators.min(1)]],
        price: ['', [Validators.required, Validators.min(1)]],
      });

      this.clientservice.getPhoneNumber().subscribe(res => {
        console.log(res);
        this.phnArray = res.data;
      });
    }
  }

  onsubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.hallcoverservice.addHallcovers(this.form.value).subscribe(
        res => {this.toastr.success('Inserted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewhallcover']);
        }
      );;
    }
  }

  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.get('id').value);
      this.hallcoverservice.updateHallcovers(this.form.value).subscribe(
        res => {this.toastr.success('Updated!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewhallcover']);
        }
      );;
    }
  }
  onDelete()
  {
      this.hallcoverservice.deleteHallcovers(this.form.get('id').value).subscribe(
        res => {
          this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewhallcover']);
        }
      );
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
