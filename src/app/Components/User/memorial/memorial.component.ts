import { Component, OnInit } from '@angular/core';
import { MemorialService } from 'src/app/Service/Memorial.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { state } from '@angular/animations';


@Component({
  selector: 'app-memorial',
  templateUrl: './memorial.component.html',
  styleUrls: ['./memorial.component.css']
})
export class MemorialComponent implements OnInit {
  memorialsArray: any[];
  imageArray: any[];
  public form: FormGroup;

 constructor(private memorialservice: MemorialService, private _fb: FormBuilder, private httpClient: HttpClient, private router: Router) {}
ngOnInit() {
      this.form = this._fb.group({
      memorialType: ['', Validators.required],
      memorialQty: ['', [Validators.required, Validators.min(1)]],

       });



      this.memorialservice.getMemorialImage().subscribe(res => {
        console.log(res);
        this.imageArray = res;
      });


  }



 save() {
   if (this.form.valid) {
  // tslint:disable-next-line: max-line-length
  this.router.navigate(['/viewClient'], {queryParams: {memorialtype: this.form.get('memorialType').value, memorialQty: this.form.get('memorialQty').value,clickbutton: "memorial"}});
   }
 }
}
