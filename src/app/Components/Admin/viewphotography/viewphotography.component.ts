import { Component, OnInit } from '@angular/core';
import { PhotographyService } from 'src/app/Service/photography.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewphotography',
  templateUrl: './viewphotography.component.html',
  styleUrls: ['./viewphotography.component.css']
})
export class ViewphotographyComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  photographyArray: any[];
  filterArray: any[];
  uniquePhotography: any[];
  editArray: any[];
  

  constructor(private fb: FormBuilder, private photographyservice: PhotographyService, private clientservice: ClientService, 
    private router: Router, private loginservice: LoginService) { }

  ngOnInit() {
    this.form = this.fb.group({
      phnNo: ['', [Validators.required]]

    });

    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });

    this.photographyservice.getPhotography().subscribe(res => {
      console.log(res);
      this.photographyArray = res.data;

    });

  }

  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }
  onSubmit() {
    this.filterArray = this.photographyArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(photography => photography.duration))).map(duration => {
      return this.filterArray.find(fp => fp.duration === duration);

    });
    console.log(array);
    this.uniquePhotography = array;
  }

  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.duration == data);
    console.log("Photogaphy",this.editArray);
    this.router.navigate(['/addphotography'], {queryParams: {  isEdit: true}});

    this.photographyservice.setEditPhotographyArray(this.editArray);
    
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
