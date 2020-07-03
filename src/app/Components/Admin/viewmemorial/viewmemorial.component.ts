import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemorialService } from 'src/app/Service/Memorial.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewmemorial',
  templateUrl: './viewmemorial.component.html',
  styleUrls: ['./viewmemorial.component.css']
})
export class ViewmemorialComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  memorialArray: any[];
  memorialImageArray: any[];
  filterArray: any[];
  uniqueMemorial: any[];
  editArray: any[];
  constructor(
    private fb: FormBuilder, private memorialservice: MemorialService, private clientservice: ClientService, private router: Router,
    private loginservice: LoginService,
  ) { }

  ngOnInit() {
     
    this.isLogin();
    this.form = this.fb.group({
      phnNo: ['', [Validators.required]]

    });

    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });

    this.memorialservice.getMemorials().subscribe(res => {
      console.log(res);
      this.memorialArray = res.data;

    });

    this.memorialservice.getMemorialImage().subscribe(res => {
      console.log(res);
      this.memorialImageArray = res.data;

    });

  }
  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }

  onSubmit() {
    this.filterArray = this.memorialArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(memorial => memorial.type))).map(type => {
      return this.filterArray.find(fp => fp.type === type);

    });
    console.log(array);
    this.uniqueMemorial = array;
  }

  
  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.type == data);
    console.log("type",this.editArray);
    this.router.navigate(['/addmemorial'], {queryParams: {  isEdit: true}});

    this.memorialservice.setEditMemorialArray(this.editArray);
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
