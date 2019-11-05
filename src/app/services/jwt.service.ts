import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User} from '../models/user';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http'; 

@Injectable({
providedIn: 'root'
})

export class JwtService {

   httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
    }); 

    options = {
      headers: this.httpHeaders
    }; 
 
    constructor(private httpClient: HttpClient) { }

    public login(_username:string, _password:string) {

      const body = new HttpParams()
                .set('_username', _username)
                .set('_password', _password);


      return this.httpClient.post<any>('http://localhost:8000/api/login_check', 
                  body.toString(), 
                  this.options).pipe(tap( data => {
                     console.log("Token: " + data.token);
                     localStorage.clear();
                     localStorage.setItem('access_token', data.token);
                  }))
    }

    public register(email:string, password:string) {
      return this.httpClient.post<{access_token: string}>('http://localhost:8000/api/register',
       {email, password}).pipe(tap(res => {
        this.login(email, password)
    }))}

    public logout(){
       localStorage.removeItem('access_token');
       localStorage.clear();
    }

    public loggedIn(): boolean{
      return localStorage.getItem('access_token') !==  null;
    }

    public getToken(): any{
      return localStorage.getItem('access_token')
    }
}
