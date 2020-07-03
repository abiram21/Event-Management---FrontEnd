import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
  }

  isAdmin()
 {
  if(localStorage.getItem('isLogin') && localStorage.getItem('isLogin') == 'true'){
    return true;
  }
  else{
    return false
  }
   
  //  return localStorage.getItem('isLogin')
 }

 login()
 {

  if(this.isAdmin())
   {
     localStorage.setItem('isLogin','false')
    this.router.navigate(['/login']);
    
   }
   else{
    this.router.navigate(['/login']);
   }
  
 }
}
