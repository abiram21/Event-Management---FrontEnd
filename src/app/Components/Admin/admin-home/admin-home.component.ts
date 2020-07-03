import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';

import { Router } from '@angular/router';
import { FACILITY } from 'src/app/Model/viewutils';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
public form: FormGroup
  facilityArray: any[];

  constructor(private fb: FormBuilder, private adminservice: AdminService, private clientservice: ClientService,
     private router: Router,
     private loginservice: LoginService) { }

  ngOnInit() {
    this.form = this.fb.group({
      facility: ['', [Validators.required]],

    });


    this.adminservice.getFacilities().subscribe(res => {
      console.log(res);
      this.facilityArray = res.data;
    });
  }

 onSubmit(data)
 {
   console.log(data);
   
   if (data=='HallCover'){
    this.router.navigate(['/viewhallcover']);
   } else if (data==FACILITY.CHAIR){
    this.router.navigate(['/viewchair']);
   } else if (data==FACILITY.FOOD){
    this.router.navigate(['/viewfood']);
   } else if (data==FACILITY.MEMORIAL){
    this.router.navigate(['/viewmemorial']);
   } else if (data==FACILITY.PHOTOGRAPHY){
    this.router.navigate(['/viewphotography']);
   } else if (data==FACILITY.LIGHT){
    this.router.navigate(['/viewlight']);
   } else if (data==FACILITY.SHORTEAT){
    this.router.navigate(['/viewshorteat']);
   } else {
    this.router.navigate(['/viewsound']);
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

 goFoodAdd()
 {
  this.router.navigate(['/addfood']);
 }
}
