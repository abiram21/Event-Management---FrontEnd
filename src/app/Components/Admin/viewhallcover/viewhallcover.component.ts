import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HallcoverService } from 'src/app/Service/hallcover.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewhallcover',
  templateUrl: './viewhallcover.component.html',
  styleUrls: ['./viewhallcover.component.css']
})
export class ViewhallcoverComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  hallcoverArray: any[];
  filterArray: any[];
  uniqueHall: any[];
  editArray: any[];
  
  constructor(private fb: FormBuilder, private hallcoverservice: HallcoverService, private clientservice: ClientService,
     private router: Router,private loginservice: LoginService) { }

  ngOnInit() {
    this.isLogin();
     
    this.form = this.fb.group({
      phnNo: ['', [Validators.required]]

    });
    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });

    this.hallcoverservice.getHallSize().subscribe(res => {
      console.log(res);
      this.hallcoverArray = res.data;

    });
  }

  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }
  onSubmit() {
    console.log(this.form.get('phnNo').value);
    
    this.filterArray = this.hallcoverArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(hallcover => hallcover.hall_size))).map(hall_size => {
      return this.filterArray.find(fp => fp.hall_size == hall_size);

    });
    console.log(array);
    this.uniqueHall = array;
  }
  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.hall_size == data);
    console.log("hallcover",this.editArray);
    this.router.navigate(['/addhallcover'], {queryParams: {  isEdit: true}});

    this.hallcoverservice.setEditHallcoverArray(this.editArray);
    
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
