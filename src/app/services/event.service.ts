import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + this.jwtService.getToken(),
 });

  options = {
    headers: this.httpHeaders
  };

  constructor(private httpClient: HttpClient, private jwtService: JwtService) { }

  public getAll() {

    return this.httpClient.get<any>('http://localhost:8000/api/v1/event',
      this.options).pipe(tap(res => {

          return res;

      }))
  }
}
