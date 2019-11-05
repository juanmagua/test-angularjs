import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  httpHeaders: any;
  options: any;

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  public getAll() {

    this.setOptions();

    return this.httpClient.get<any>(environment.apiUrl + '/api/v1/event',
      this.options).pipe(tap(res => {

        return res;

      }))
  }

  public update(id: string, title: string, date: string) {

    this.setOptions();

    const params = new HttpParams()
      .set('id', id)
      .set('name', title)
      .set('created', date);

    return this.httpClient.put<any>(environment.apiUrl + '/api/v1/event/' + id,
      params, this.options).pipe(tap(res => {
        return res;
    }))

  }

  private setOptions(){
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.jwtService.getToken(),
    });

    this.options = {
      headers: this.httpHeaders
    };
  }
}
