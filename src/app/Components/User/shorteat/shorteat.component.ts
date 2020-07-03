import { Component, OnInit } from '@angular/core';
import { ShorteatService } from 'src/app/Service/shorteat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { state } from '@angular/animations';




@Component({
  selector: 'app-shorteat',
  templateUrl: './shorteat.component.html',
  styleUrls: ['./shorteat.component.css']
})


export class ShorteatComponent implements OnInit {
  shorteatsArray: any[];
  public form: FormGroup;
  String

  constructor(private shorteatservice: ShorteatService, private _fb: FormBuilder, private httpClient: HttpClient, private router: Router) {

  }



  ngOnInit() {
    this.form = this._fb.group({
      shorteatspreference: ["", Validators.required],
      shorteatsQty: ["", [Validators.required, Validators.min(1)]]
    })



    this.shorteatservice.getShorteats().subscribe(res => {
      let shorteatsArray1 = res.data;

      const array = Array.from(new Set(shorteatsArray1.map(shorteat => shorteat.type))).map(type => {
        return shorteatsArray1.find(sp => sp.type === type)

      })
      console.log(array)
      this.shorteatsArray = array
    });
  }

  save() {
    if (this.form.valid) {
      this.router.navigate(['/viewClient'], { queryParams: { shorteattype: this.form.get("shorteatspreference").value, shorteatQty: this.form.get("shorteatsQty").value, clickbutton: "shorteats" } });
    }
  }
}