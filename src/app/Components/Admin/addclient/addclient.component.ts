import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  public form: FormGroup;
  editFoodArray: FormArray;
  flag = this.route.snapshot.queryParams['isEdit'];
  constructor(private fb: FormBuilder, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.isLogin();
    if (this.route.snapshot.queryParams['isEdit']) {
      this.clientservice.editClientArray$.subscribe(data => {
        this.form = this.fb.group({
          id: [data[0].id, [Validators.required, Validators.min(1)]],
          name: [data[0].name, [Validators.required, Validators.pattern('[a-zA-Z. ]*')]],
          address: [data[0].address, [Validators.required, Validators.pattern('[a-zA-Z0-9., ]*')]],
          description: [data[0].description, [Validators.required, Validators.min(1)]],
          email: [data[0].email, [Validators.required, Validators.email]],
          phone: [data[0].phoneNo, [Validators.required,Validators.maxLength(9)]],

        });


      });

    }
    else{
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z. ]*')]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9., ]*')]],
      description: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.maxLength(10)]],

    });
  }
  }
  onsubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.clientservice.addClient(this.form.value).subscribe(
        res => {
          this.toastr.success('Inserted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewclient']);
        }
      );;
    }
  }
  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.get('id').value);
      this.clientservice.updateClient(this.form.value).subscribe(
        res => {
          this.toastr.success('Updated!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewclient']);
        }
      );;
    }
  }
  onDelete()
  {
      this.clientservice.deleteClient(this.form.get('id').value).subscribe(
        res => {
          this.toastr.success('Deleted!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewclient']);
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
