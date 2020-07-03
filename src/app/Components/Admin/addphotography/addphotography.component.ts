import { Component, OnInit } from '@angular/core';
import { PhotographyService } from 'src/app/Service/photography.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addphotography',
  templateUrl: './addphotography.component.html',
  styleUrls: ['./addphotography.component.css']
})
export class AddphotographyComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  editPhotographyArray: FormArray;
  flag = this.route.snapshot.queryParams['isEdit'];
  

  constructor(private _fb: FormBuilder, private photographyservice: PhotographyService, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.isLogin();
    if (this.route.snapshot.queryParams['isEdit']) {
      this.photographyservice.editPhotographyArray$.subscribe(data => {
        this.form = this._fb.group({
          id:[data[0].id,[Validators.required, Validators.min(1)]],
          duration: [data[0].duration, [Validators.required]],
          client_id: [data[0].client_id, [Validators.required, Validators.min(1)]],
          price: [data[0].price, [Validators.required, Validators.min(1)]],

        });


      });

    }
    else{

    this.form = this._fb.group({
      duration: ['', [Validators.required]],
      client_id: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]]

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
    this.photographyservice.addPhotography(this.form.value).subscribe(
      res => {this.toastr.success('Inserted!', 'Success!',
      {timeOut: 2000});;
        this.router.navigate(['/viewphotography']);
      }
    );;
    }
  }

  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.get('id').value);
      this.photographyservice.updatePhotography(this.form.value).subscribe(
        res => {this.toastr.success('Updated!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewphotography']);
        }
      );;
    }
  }
  onDelete()
  {
      this.photographyservice.deletePhotography(this.form.get('id').value).subscribe(
        res => {this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewphotography']);
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
