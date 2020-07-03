import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SoundService } from 'src/app/Service/sound.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-viewsound',
  templateUrl: './viewsound.component.html',
  styleUrls: ['./viewsound.component.css']
})
export class ViewsoundComponent implements OnInit {
  public form: FormGroup;
  phnArray: any[];
  soundArray: any[];
  filterArray: any[];
  uniqueSound: any[];
  editArray: any[];
  
  
  constructor(private fb: FormBuilder, private soundservice: SoundService, private clientservice: ClientService, 
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

    this.soundservice.getStageSize().subscribe(res => {
      console.log(res);
      this.soundArray = res.data;

    });
  }

  getSelectedPhnNo() {
    return this.form.get('phnNo');
  }
  onSubmit() {
    if(this.form.valid){

    
    this.filterArray = this.soundArray.filter(f => f.client_id == this.form.get('phnNo').value);
    console.log(this.filterArray);
    const array = Array.from(new Set(this.filterArray.map(sound => sound.stage_size))).map(stage_size => {
      return this.filterArray.find(fp => fp.stage_size === stage_size);

    });
    console.log(array);
    this.uniqueSound = array;
  }
  }
  goEdit(data) {
   

    this.editArray = this.filterArray.filter(f => f.stage_size == data);
    console.log("sound",this.editArray);
    this.router.navigate(['/addsound'], {queryParams: {  isEdit: true}});

    this.soundservice.setEditSoundArray(this.editArray);
    
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
