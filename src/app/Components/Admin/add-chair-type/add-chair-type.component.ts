import { Component, OnInit } from '@angular/core';
import { ChairService } from 'src/app/Service/chair.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';

@Component({
  selector: 'app-add-chair-type',
  templateUrl: './add-chair-type.component.html',
  styleUrls: ['./add-chair-type.component.css']
})
export class AddChairTypeComponent implements OnInit {
  public form: FormGroup;
  chairtypeArray: any[];
  
  constructor(private _fb: FormBuilder, private chairservice: ChairService, private clientservice: ClientService) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: ['', [Validators.required]]
    });
  }

}
