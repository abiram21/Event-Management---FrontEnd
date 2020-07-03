import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin$ = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) { }

  isLoginSet(value)
  {
    this.isLogin$.next(value);
  }
  getUsers(){
    return this.http.get<any>('http://localhost:8000/api/users')

  }

}
