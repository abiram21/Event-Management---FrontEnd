import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {
  photosArray: any[];
  public form: FormGroup;

  constructor( private _fb: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.form = this._fb.group(
      {
        duration:["",[Validators.required]]
      }
    );
  }
  save() {
    if (this.form.valid) {
   this.router.navigate(['/viewClient'], {queryParams: {duration: this.form.get("duration").value, clickbutton: 'photography'}});
    }

  }
}
