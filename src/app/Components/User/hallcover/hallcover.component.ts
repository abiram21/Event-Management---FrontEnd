import { Component, OnInit } from '@angular/core';
import { HallcoverService } from 'src/app/Service/hallcover.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hallcover',
  templateUrl: './hallcover.component.html',
  styleUrls: ['./hallcover.component.css']
})
export class HallcoverComponent implements OnInit {
 hallcoverArray: any[];
 public form: FormGroup;

  constructor(private hallcoverservice: HallcoverService, private _fb: FormBuilder,private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
    this.form = this._fb.group(
      {
        hallSize:["",[Validators.required]]
      }
    )
    this.hallcoverservice.getHallSize().subscribe(res=>
      {
        let hallSizeArray= res.data;

        const array = Array.from(new Set(hallSizeArray.map(hallSize=>hallSize.hall_size))).map(hall_size=>{
          return hallSizeArray.find(fp=>fp.hall_size === hall_size)
          
        })
        console.log(array)
        this.hallcoverArray = array
        });
      
  }


  save()
 {
  if(this.form.valid) 
  {
  this.router.navigate(['/viewClient'],{queryParams: {size: this.form.get("hallSize").value,clickbutton: "hallcover"}});
  }
 }

}
