import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
 loginArray: any[];
constructor(private router: Router, private fb: FormBuilder, private loginservice: LoginService) { }

ngOnInit() {
  this.form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  this.loginservice.getUsers().subscribe(res => {
    console.log(res);
    this.loginArray = res.data;
    console.log(this.loginArray);
  });

}

onsubmit() {
 let user = this.loginArray.find(u=>u.name == this.form.get('username').value);
 console.log(user);
 
 if(user)
 {

   if(user.password == this.form.get('password').value)
   {

    this.router.navigate(['/']);
  localStorage.setItem('isLogin','true');
    
    
   }
 }
 
  

 

}

getLogin()
 {
   if(localStorage.getItem('isLogin'))
   {
     return localStorage.getItem('isLogin');
   }
   else{
    return false;
  }
 }
 
}
