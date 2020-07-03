import { Component } from '@angular/core';
import { LoginService } from './Service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'ueos';
constructor(private loginservice: LoginService){

}
 isAdmin()
 {
  if(localStorage.getItem('isLogin') && localStorage.getItem('isLogin') == 'true'){
    return true;
  }
  else{
    return false
  }
 }

//  getClass(){
//   if(this.loginservice.isLogin$.value == true)
//   {
//     return 'col-md-11';
//   }
//   else{
//     return 'col-md-12';
//   }
//  }
  
}

