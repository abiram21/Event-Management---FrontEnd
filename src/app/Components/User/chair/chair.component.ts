import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChairService } from 'src/app/Service/chair.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {
  chairArray: any[];
  imageArray: any[];
  public form: FormGroup;


  constructor(private chairservice: ChairService, private _fb: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: [null, Validators.required],
      image: [null],
      uncoveredChairs: [null, [Validators.required, Validators.min(1)]],
      coveredChairs: [null, [Validators.required, Validators.min(1)]]
    });
    this.chairservice.getChairtypes().subscribe(res => {
      console.log(res);
      this.chairArray = res.data;
    });
    this.chairservice.getChairImage().subscribe(res => {
      console.log('Image => ', res);
      this.imageArray = res;
    });
  }


  save() {
    if (this.form.valid) {
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/viewClient'], { queryParams: { type: this.form.get('type').value, uncoveredChairs: this.form.get('uncoveredChairs').value, coveredChairs: this.form.get('coveredChairs').value } });
    }

  }

}
