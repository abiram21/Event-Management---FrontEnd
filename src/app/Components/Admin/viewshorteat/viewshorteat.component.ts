import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShorteatService } from 'src/app/Service/shorteat.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewshorteat',
  templateUrl: './viewshorteat.component.html',
  styleUrls: ['./viewshorteat.component.css']
})
export class ViewshorteatComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  shorteatArray: any[];
  filterArray: any[];
  uniqueShorteat: any[];
  editArray: any[];
  

  constructor(private fb: FormBuilder, private shorteatservice: ShorteatService, private clientservice: ClientService, 
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

    this.shorteatservice.getShorteats().subscribe(res => {
      console.log(res);
      this.shorteatArray = res.data;

    });

  }

  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }
  onSubmit() {
    this.filterArray = this.shorteatArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(shorteat => shorteat.type))).map(type => {
      return this.filterArray.find(fp => fp.type === type);

    });
    console.log(array);
    this.uniqueShorteat = array;
  }

  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.type == data);
    console.log("shorteat",this.editArray);
    this.router.navigate(['/addshorteat'], {queryParams: {  isEdit: true}});

    this.shorteatservice.setEditShorteatArray(this.editArray);
    
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
