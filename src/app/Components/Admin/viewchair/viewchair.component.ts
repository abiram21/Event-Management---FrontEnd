import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChairService } from 'src/app/Service/chair.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewchair',
  templateUrl: './viewchair.component.html',
  styleUrls: ['./viewchair.component.css']
})
export class ViewchairComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  chairArray: any[];
  chairImageArray: any[];
  filterArray: any[];
  uniqueChair: any[];
  editArray: any[];
  
  constructor(private fb: FormBuilder, private chairservice: ChairService,
   private clientservice: ClientService, private router: Router,
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

    this.chairservice.getChairs().subscribe(res => {
      console.log(res);
      this.chairArray = res.data;

    });

    this.chairservice.getChairImage().subscribe(res => {
      console.log(res);
      this.chairImageArray = res.data;

    });


  }

  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }

  onSubmit() {
    this.filterArray = this.chairArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(chair => chair.type))).map(type => {
      return this.filterArray.find(fp => fp.type === type);

    });
    console.log(array);
    this.uniqueChair = array;
  }

  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.type == data);
    console.log("type",this.editArray);
    this.router.navigate(['/addchair'], {queryParams: {  isEdit: true}});

    this.chairservice.setEditChairArray(this.editArray);
    
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
