import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';


@Component({
  selector: 'app-add-chairtype',
  templateUrl: './add-chairtype.component.html',
  styleUrls: ['./add-chairtype.component.css']
})
export class AddChairtypeComponent implements OnInit {
selectedFile: File = null;
  constructor(private http: HttpClient,private router: Router,
    private route: ActivatedRoute,
    private loginservice: LoginService,) { }

  ngOnInit() {
  }

  onFileSelected(event)
  {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
    
  }

  onUpload()
  {
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.http.post<any>('http://localhost:8000/api/chairtypes/',fd).subscribe(res=>
      {
        console.log(res)
      }
    )


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
