import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LightService } from 'src/app/Service/light.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewlight',
  templateUrl: './viewlight.component.html',
  styleUrls: ['./viewlight.component.css']
})
export class ViewlightComponent implements OnInit {

  public form: FormGroup;
  phnArray: any[];
  lightArray: any[];
  filterArray: any[];
  uniqueLight: any[];
  editArray: any[];
  
  constructor(private fb: FormBuilder, private lightservice: LightService, private clientservice: ClientService, 
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

    this.lightservice.getStageSize().subscribe(res => {
      console.log(res);
      this.lightArray = res.data;

    });
  }

  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }
  onSubmit() {
    if(this.form.valid){

    
    this.filterArray = this.lightArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(light => light.stage_size))).map(stage_size => {
      return this.filterArray.find(fp => fp.stage_size === stage_size);

    });
    console.log(array);
    this.uniqueLight = array;
  }
  }
  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.stage_size == data);
    console.log("light",this.editArray);
    this.router.navigate(['/addlight'], {queryParams: {  isEdit: true}});

    this.lightservice.setEditLightArray(this.editArray);
    
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
