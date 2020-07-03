import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LightService } from 'src/app/Service/light.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addlight',
  templateUrl: './addlight.component.html',
  styleUrls: ['./addlight.component.css']
})
export class AddlightComponent implements OnInit {
 public form: FormGroup;
 phnArray: any[];
 editLightArray: FormArray;
 flag = this.route.snapshot.queryParams['isEdit'];
  
  constructor(private _fb: FormBuilder, private lightservice: LightService, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.isLogin();

    if (this.route.snapshot.queryParams['isEdit']) {
      this.lightservice.editLightArray$.subscribe(data => {
        this.form = this._fb.group({
          id:[data[0].id,[Validators.required, Validators.min(1)]],
          stage_size: [data[0].stage_size, [Validators.required]],
          client_id: [data[0].client_id, [Validators.required, Validators.min(1)]],
          price: [data[0].price, [Validators.required, Validators.min(1)]],

        });


      });

    }
    else{
    this.form = this._fb.group({
      stage_size: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      client_id: ['', [Validators.required, Validators.min(1)]],

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
    this.lightservice.addLights(this.form.value).subscribe(
      res => {this.toastr.success('Inserted!', 'Success!',
      {timeOut: 2000});;
        this.router.navigate(['/viewlight']);
      }
    );;
    }
  }

  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.get('id').value);
      this.lightservice.updateLights(this.form.value).subscribe(
        res => {this.toastr.success('Updated!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewlight']);
        }
      );;
    }
  }
  onDelete()
  {
      this.lightservice.deleteLight(this.form.get('id').value).subscribe(
        res => {
          this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewlight']);
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
