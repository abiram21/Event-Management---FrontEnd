import { Component, OnInit } from '@angular/core';
import { LightService } from 'src/app/Service/light.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  lightArray: any[];
  public form: FormGroup;

  constructor(private lightservice: LightService, private _fb: FormBuilder,private httpClient: HttpClient,private router: Router) { }

  ngOnInit() { this.form = this._fb.group(
    {
      stageSize:["",[Validators.required]]
    }
  )

    this.lightservice.getStageSize().subscribe(res=>
      {
        let stageSizeArray= res.data;

        const array = Array.from(new Set(stageSizeArray.map(stageSize=>stageSize.stage_size))).map(stage_size=>{
          return stageSizeArray.find(fp=>fp.stage_size === stage_size)
      })

      console.log(array)
        this.lightArray = array
      });
  }
  

  save()
  {
    if(this.form.valid)
    {
   this.router.navigate(['/viewClient'],{queryParams: {size: this.form.get("stageSize").value,clickbutton: "light"}});
    }
  }

}
