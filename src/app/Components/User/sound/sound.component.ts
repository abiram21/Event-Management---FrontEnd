import { Component, OnInit } from '@angular/core';
import { SoundService } from 'src/app/Service/sound.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {
  soundArray :any[];
  public form: FormGroup;
  constructor(private soundservice: SoundService, private _fb:FormBuilder,private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
    this.form= this._fb.group(
      {
        stagesize:["",[Validators.required]],
        type:["",[Validators.required]]
      }
    )

    this.soundservice.getStageSize().subscribe(res=>{
      let stageSizeArray= res.data;

        const array = Array.from(new Set(stageSizeArray.map(size=>size.stage_size))).map(stage_size=>{
          return stageSizeArray.find(fp=>fp.stage_size === stage_size)
      })

      console.log(array)
        this.soundArray = array
      });
  }



  save()
  {
    if(this.form.valid)
    {
   this.router.navigate(['/viewClient'],{queryParams: {size: this.form.get("stagesize").value,type: this.form.get("type").value,clickbutton: "sound"}});
    }
  }
}
