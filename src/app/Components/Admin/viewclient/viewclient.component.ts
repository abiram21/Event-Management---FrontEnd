import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  filterArray: any[];
  editArray: any[];
  
  constructor( private fb: FormBuilder,private clientservice: ClientService, private router: Router,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.isLogin();
    this.form = this.fb.group({
      phnNo: ['', [Validators.required]]

    });

    
    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });

  }
  onSubmit()
  {
    this.filterArray = this.phnArray.filter(f => f.id == this.form.get('phnNo').value);
    console.log(this.filterArray);
  }

  goEdit(data) {
   
    this.editArray = this.phnArray.filter(f => f.id == data);
    
    this.router.navigate(['/addclient'], {queryParams: {  isEdit: true}});

    this.clientservice.setEditclientArray(this.editArray);
    
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
