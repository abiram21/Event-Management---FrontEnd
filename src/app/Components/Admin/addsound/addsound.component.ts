import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SoundService } from 'src/app/Service/sound.service';
import { ClientService } from 'src/app/Service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-addsound',
  templateUrl: './addsound.component.html',
  styleUrls: ['./addsound.component.css']
})
export class AddsoundComponent implements OnInit {
public form: FormGroup;
phnArray: any[];
editLightArray: FormArray;
 flag = this.route.snapshot.queryParams['isEdit'];
 selected = "Indoor";
  
  constructor(private _fb: FormBuilder, private soundservice: SoundService, private clientservice: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loginservice: LoginService) { }

  ngOnInit() {
    //this.isLogin();
    if (this.route.snapshot.queryParams['isEdit']) {
      
      
      this.soundservice.editSoundArray$.subscribe(data => {
        this.form = this._fb.group({
          
          id:[data[0].id,[Validators.required, Validators.min(1)]],
          stage_size: [data[0].stage_size, [Validators.required]],
          place_type: [data[0].place_type, [Validators.required]],
          client_id: [data[0].client_id, [Validators.required, Validators.min(1)]],
          price: [data[0].price, [Validators.required, Validators.min(1)]],

        });

        console.log(data[0].place_type);
      });

    }
    else{

    this.form = this._fb.group({
      stage_size: ['', [Validators.required]],
      place_type: ['', [Validators.required]],
      client_id: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]]

    });

    this.clientservice.getPhoneNumber().subscribe(res => {
      console.log(res);
      this.phnArray = res.data;
    });

  }
}

  onsubmit() {
    if (this.form.valid) {
    console.log(this.form.value);
    this.soundservice.addSounds(this.form.value).subscribe(
      res => {
        this.toastr.success(this.form.get('stage_size').value+','+this.form.get('place_type').value+','+this.form.get('price').value+'!', 'Success!',
        {timeOut: 2000});;
          this.router.navigate(['/viewsound']);
      });
    }
    
  }

  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.get('id').value);
      this.soundservice.updateSound(this.form.value).subscribe(
        res => {
          this.toastr.success('Sound Updated', 'Successfully Updated!',
          {timeOut: 4000});;
          this.router.navigate(['/viewsound']);
        }
      );;
    }
  }
  onDelete()
  {
      this.soundservice.deleteSound(this.form.get('id').value).subscribe(
        res => {
          this.toastr.success(this.form.get('stage_size').value+','+this.form.get('place_type').value+','+this.form.get('price').value+'!', 'Successfully Deleted!',
          {timeOut: 4000});;
          this.router.navigate(['/viewsound']);
        }
      );
  }


  // isLogin()
  // {
  //   if(this.loginservice.isLogin$.value)
  //   {
       
  //   }
  //   else{
      
  //     this.router.navigate(['/login']);
  //   }
  // }
}
